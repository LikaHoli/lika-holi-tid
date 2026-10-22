create table public.records (
 owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
 id text not null check (length(id) between 1 and 100),
 kind text not null check (kind in ('client','entry')),
 data jsonb not null check (jsonb_typeof(data)='object'),
 revision bigint not null default 1 check (revision>0),
 updated_at timestamptz not null default now(),
 primary key (owner,id),
 constraint record_identity check (coalesce(data->>'kind'=kind and data->>'id'=id,false)),
 constraint record_fields check (
 case when kind='client' then coalesce(
 jsonb_typeof(data->'name')='string' and length(trim(data->>'name')) between 1 and 200
 and jsonb_typeof(data->'rate')='number' and (data->>'rate')::numeric between 0 and 100000000
 and jsonb_typeof(data->'mileRate')='number' and (data->>'mileRate')::numeric between 0 and 100000000,false)
 else coalesce(jsonb_typeof(data->'client')='string' and length(data->>'client') between 1 and 100
 and jsonb_typeof(data->'description')='string' and length(trim(data->>'description')) between 1 and 4000
 and (data->>'date') ~ '^\d{4}-\d{2}-\d{2}$' and to_char((data->>'date')::date,'YYYY-MM-DD')=(data->>'date')
 and jsonb_typeof(data->'hours')='number' and (data->>'hours')::numeric between 0 and 24
 and jsonb_typeof(data->'rate')='number' and (data->>'rate')::numeric between 0 and 100000000
 and jsonb_typeof(data->'miles')='number' and (data->>'miles')::numeric between 0 and 100000000
 and jsonb_typeof(data->'mileRate')='number' and (data->>'mileRate')::numeric between 0 and 100000000
 and jsonb_typeof(data->'invoiced')='boolean',false) end)
);
alter table public.records enable row level security;
alter table public.records force row level security;
revoke all on public.records from anon;
grant select,insert,update,delete on public.records to authenticated;
create policy select_own on public.records for select to authenticated using ((select auth.uid())=owner);
create policy insert_own on public.records for insert to authenticated with check ((select auth.uid())=owner);
create policy update_own on public.records for update to authenticated using ((select auth.uid())=owner) with check ((select auth.uid())=owner);
create policy delete_own on public.records for delete to authenticated using ((select auth.uid())=owner);
create function public.mutate_records(changes jsonb) returns void
language plpgsql security invoker set search_path = '' as $$
declare uid uuid:=auth.uid(); item jsonb; prior bigint; expected bigint; rid text;
begin
 if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
 if jsonb_typeof(changes) is distinct from 'array' or jsonb_array_length(changes)>10000 then raise exception 'Invalid changes'; end if;
 for item in select value from jsonb_array_elements(changes) order by value->>'id' loop
  rid:=item->>'id'; expected:=(item->>'expected_revision')::bigint;
  if rid is null or expected is null or expected<0 then raise exception 'Invalid revision'; end if;
  select revision into prior from public.records where owner=uid and id=rid for update;
  if coalesce(prior,0)<>expected then raise exception 'SYNC_CONFLICT: record changed on another device' using errcode='40001'; end if;
  if item->>'action'='delete' then
   delete from public.records where owner=uid and id=rid;
  elsif item->>'action'='save' then
   if prior is null then
    insert into public.records(owner,id,kind,data) values(uid,rid,item->>'kind',item->'data');
   else
    update public.records set data=item->'data',kind=item->>'kind',revision=revision+1,updated_at=now() where owner=uid and id=rid;
   end if;
  else raise exception 'Invalid action'; end if;
 end loop;
end;
$$;
revoke all on function public.mutate_records(jsonb) from public,anon;
grant execute on function public.mutate_records(jsonb) to authenticated;
