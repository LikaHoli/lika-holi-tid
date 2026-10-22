-- Run once in your Supabase project. User data stays separate from GitHub.
create table public.records (
 owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
 id text not null check (length(id) between 1 and 100),
 kind text not null check (kind in ('client','entry')),
 data jsonb not null check (jsonb_typeof(data)='object'),
 updated_at timestamptz not null default now(),
 primary key (owner,id),
 constraint record_kind_matches check (coalesce(data->>'kind'=kind and data->>'id'=id,false)),
 constraint record_data_valid check (
  case when kind='client' then
   coalesce(jsonb_typeof(data->'name')='string' and length(trim(data->>'name')) between 1 and 200
    and jsonb_typeof(data->'rate')='number' and (data->>'rate')::numeric between 0 and 100000000
    and jsonb_typeof(data->'mileRate')='number' and (data->>'mileRate')::numeric between 0 and 100000000,false)
  else
   coalesce(jsonb_typeof(data->'client')='string' and length(data->>'client')>0
    and jsonb_typeof(data->'description')='string' and length(trim(data->>'description')) between 1 and 4000
    and (data->>'date') ~ '^\d{4}-\d{2}-\d{2}$' and to_char((data->>'date')::date,'YYYY-MM-DD')=data->>'date'
    and jsonb_typeof(data->'hours')='number' and (data->>'hours')::numeric between 0 and 24
    and jsonb_typeof(data->'rate')='number' and (data->>'rate')::numeric between 0 and 100000000
    and jsonb_typeof(data->'miles')='number' and (data->>'miles')::numeric between 0 and 100000000
    and jsonb_typeof(data->'mileRate')='number' and (data->>'mileRate')::numeric between 0 and 100000000
    and jsonb_typeof(data->'invoiced')='boolean',false)
  end
 )
);
alter table public.records enable row level security;
alter table public.records force row level security;
revoke all on public.records from anon;
grant select,insert,update,delete on public.records to authenticated;
create policy records_select_own on public.records for select to authenticated using ((select auth.uid()) = owner);
create policy records_insert_own on public.records for insert to authenticated with check ((select auth.uid()) = owner);
create policy records_update_own on public.records for update to authenticated using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy records_delete_own on public.records for delete to authenticated using ((select auth.uid()) = owner);
