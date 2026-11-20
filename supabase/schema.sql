-- Ejecutar en Supabase > SQL Editor. El proyecto de evaluación es de un solo administrador.
-- IMPORTANTE: la app usa una service role key SOLO en el servidor.
create extension if not exists pgcrypto;
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 sku text not null unique,
 name text not null,
 category text not null,
 stock integer not null default 0 check(stock >= 0),
 min_stock integer not null default 5 check(min_stock >= 0),
 cost numeric(12,2) not null check(cost >= 0),
 price numeric(12,2) not null check(price >= 0),
 created_at timestamptz not null default now()
);
create table if not exists public.sales (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete restrict,
 quantity integer not null check(quantity > 0),
 unit_price numeric(12,2) not null check(unit_price >= 0),
 total numeric(12,2) not null check(total >= 0),
 created_at timestamptz not null default now()
);
create index if not exists idx_sales_date on public.sales(created_at desc);
create index if not exists idx_sales_product on public.sales(product_id);
alter table public.products enable row level security;
alter table public.sales enable row level security;
-- Sin políticas públicas: solo el backend con service role puede leer/escribir.
create or replace function public.register_sale(p_product_id uuid,p_quantity integer)
returns table(id uuid)
language plpgsql security invoker set search_path = public
as $$
declare v_stock integer;v_price numeric(12,2);v_sale_id uuid;
begin
 if p_quantity is null or p_quantity <= 0 then raise exception 'Cantidad inválida';end if;
 select stock,price into v_stock,v_price from public.products where products.id=p_product_id for update;
 if not found then raise exception 'Producto no encontrado';end if;
 if v_stock < p_quantity then raise exception 'Stock insuficiente';end if;
 update public.products set stock=stock-p_quantity where products.id=p_product_id;
 insert into public.sales(product_id,quantity,unit_price,total) values(p_product_id,p_quantity,v_price,v_price*p_quantity) returning sales.id into v_sale_id;
 return query select v_sale_id;
end;$$;
revoke all on function public.register_sale(uuid,integer) from public,anon,authenticated;
grant execute on function public.register_sale(uuid,integer) to service_role;
