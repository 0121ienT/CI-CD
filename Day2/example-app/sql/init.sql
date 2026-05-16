create table if not exists orders (
  id bigserial primary key,
  customer text not null,
  item text not null,
  quantity integer not null check (quantity > 0),
  status text not null default 'created',
  created_at timestamptz not null default now()
);

insert into orders (customer, item, quantity)
values
  ('Ada', 'Docker notebook', 1),
  ('Linus', 'Compose cheat sheet', 2)
on conflict do nothing;
