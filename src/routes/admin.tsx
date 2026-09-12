import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import {
  adminAbandonedCarts,
  adminAnalytics,
  adminCheckOrder,
  adminGetMetaSettings,
  adminGetSettings,
  adminLive,
  adminLogin,
  adminLogout,
  adminOrders,
  adminOverview,
  adminSaveMetaSettings,
  adminSaveSettings,
  adminSessionState,
  adminTestMetaEvent,
  adminTestTikTokEvent,
  adminTopProducts,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel da Loja | Vendas, visitantes e pixel" },
      {
        name: "description",
        content:
          "Painel interno da loja: visitantes ao vivo, pedidos Pix, produtos mais vendidos e configuração do pixel do TikTok.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel da Loja" },
      { property: "og:description", content: "Visitantes ao vivo, pedidos Pix e produtos mais vendidos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const currency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const time = (value?: string | null) =>
  value ? new Date(value).toLocaleString("pt-BR", { hour12: false }) : "-";

type TabKey = "live" | "vendas" | "analises" | "carrinhos" | "produtos" | "pixel";

function AdminPage() {
  const sessionFn = useServerFn(adminSessionState);
  const session = useQuery({
    queryKey: ["admin-session"],
    queryFn: () => sessionFn({}),
    retry: false,
  });

  if (session.isPending) {
    return <Shell><p className="text-sm text-zinc-400">Carregando…</p></Shell>;
  }
  if (!session.data?.unlocked) return <LoginScreen />;
  return <Dashboard />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}

function LoginScreen() {
  const queryClient = useQueryClient();
  const loginFn = useServerFn(adminLogin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useMutation({
    mutationFn: (value: string) => loginFn({ data: { password: value } }),
    onSuccess: (result) => {
      if (result.ok) {
        void queryClient.invalidateQueries({ queryKey: ["admin-session"] });
      } else {
        setError(result.message ?? "Senha incorreta.");
      }
    },
    onError: () => setError("Não foi possível entrar. Tente novamente."),
  });

  return (
    <Shell>
      <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h1 className="text-lg font-semibold">Painel da loja</h1>
        <p className="mt-1 text-sm text-zinc-400">Digite a senha para acessar.</p>
        <form
          className="mt-5 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            login.mutate(password);
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Senha"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-rose-500"
          />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {login.isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </Shell>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();
  const logoutFn = useServerFn(adminLogout);
  const [tab, setTab] = useState<TabKey>("live");
  const [days, setDays] = useState(7);

  const overviewFn = useServerFn(adminOverview);
  const overview = useQuery({
    queryKey: ["admin-overview", days],
    queryFn: () => overviewFn({ data: { days } }),
    refetchInterval: 30_000,
  });

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "live", label: "Ao vivo" },
    { key: "vendas", label: "Vendas" },
    { key: "analises", label: "Análises" },
    { key: "carrinhos", label: "Carrinhos abandonados" },
    { key: "produtos", label: "Produtos" },
    { key: "pixel", label: "Pixels (TikTok e Facebook)" },
  ];

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Painel da loja</h1>
          <p className="text-sm text-zinc-400">Acompanhe visitantes, vendas e marcação de conversão.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm"
          >
            {[1, 7, 14, 30, 90].map((option) => (
              <option key={option} value={option}>
                {option === 1 ? "Hoje" : `${option} dias`}
              </option>
            ))}
          </select>
          <button
            onClick={async () => {
              await logoutFn({});
              void queryClient.invalidateQueries({ queryKey: ["admin-session"] });
            }}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300"
          >
            Sair
          </button>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Visitantes" value={String(overview.data?.totals.sessions ?? 0)} />
        <Metric label="Pix gerados" value={String(overview.data?.totals.pixCount ?? 0)} />
        <Metric label="Vendas pagas" value={String(overview.data?.totals.paidCount ?? 0)} accent />
        <Metric label="Faturamento" value={currency(overview.data?.totals.revenue ?? 0)} accent />
        <Metric label="Ticket médio" value={currency(overview.data?.totals.ticket ?? 0)} />
        <Metric
          label="Pix → pago"
          value={`${(overview.data?.totals.conversion ?? 0).toFixed(1)}%`}
        />
        <Metric
          label="Visita → pago"
          value={`${(overview.data?.totals.sessionToPaid ?? 0).toFixed(2)}%`}
        />
        <Metric label="Páginas vistas" value={String(overview.data?.totals.pageviews ?? 0)} />
      </section>

      <nav className="mt-8 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm ${
              tab === item.key ? "bg-rose-500 text-white" : "border border-zinc-700 text-zinc-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-5">
        {tab === "live" ? <LiveTab /> : null}
        {tab === "vendas" ? (
          <SalesTab
            funnel={overview.data?.funnel ?? []}
            series={overview.data?.series ?? []}
            devices={overview.data?.devices ?? []}
            sources={overview.data?.sources ?? []}
          />
        ) : null}
        {tab === "analises" ? <AnalyticsTab days={days} /> : null}
        {tab === "carrinhos" ? <AbandonedTab days={days} /> : null}
        {tab === "produtos" ? <ProductsTab days={days} /> : null}
        {tab === "pixel" ? <PixelTab /> : null}
      </div>
    </Shell>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-1 text-lg font-semibold ${accent ? "text-emerald-400" : "text-zinc-100"}`}>
        {value}
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const LIVE_RANGES: Array<{ label: string; minutes: number }> = [
  { label: "1 min", minutes: 1 },
  { label: "5 min", minutes: 5 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hora", minutes: 60 },
  { label: "3 horas", minutes: 180 },
  { label: "12 horas", minutes: 720 },
  { label: "24 horas", minutes: 1440 },
];

function RankList({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <Card title={title}>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            <div className="flex justify-between gap-2 text-zinc-300">
              <span className="truncate">{item.label}</span>
              <span className="text-zinc-500">{item.value}</span>
            </div>
            <div className="mt-1 h-1.5 rounded bg-zinc-800">
              <div className="h-1.5 rounded bg-rose-500/80" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
        {items.length === 0 ? <li className="text-zinc-500">Sem dados no período.</li> : null}
      </ul>
    </Card>
  );
}

function LiveTab() {
  const liveFn = useServerFn(adminLive);
  const [minutes, setMinutes] = useState(5);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const live = useQuery({
    queryKey: ["admin-live", minutes],
    queryFn: () => liveFn({ data: { minutes } }),
    refetchInterval: autoRefresh ? (minutes <= 15 ? 5_000 : 20_000) : false,
  });
  const data = live.data;
  const rangeLabel = LIVE_RANGES.find((range) => range.minutes === minutes)?.label ?? `${minutes} min`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {LIVE_RANGES.map((range) => (
          <button
            key={range.minutes}
            onClick={() => setMinutes(range.minutes)}
            className={`rounded-full px-3 py-1 text-xs ${
              minutes === range.minutes
                ? "bg-emerald-500 text-zinc-950"
                : "border border-zinc-700 text-zinc-300"
            }`}
          >
            {range.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(event) => setAutoRefresh(event.target.checked)}
          />
          Atualizar sozinho
        </label>
        <button
          onClick={() => void live.refetch()}
          className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
        >
          Atualizar agora
        </button>
      </div>

      <div className="rounded-xl border border-emerald-800/50 bg-emerald-500/5 p-4">
        <p className="flex items-center gap-2 text-sm text-emerald-300">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {data?.onlineNow ?? 0} pessoa(s) na loja nos últimos {rangeLabel}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
          <Metric label="Home" value={String(data?.stages.home ?? 0)} />
          <Metric label="Produto" value={String(data?.stages.product ?? 0)} />
          <Metric label="Carrinho" value={String(data?.stages.cart ?? 0)} />
          <Metric label="Checkout" value={String(data?.stages.checkout ?? 0)} />
          <Metric label="Pagamento" value={String(data?.stages.payment ?? 0)} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric label="Pix no período" value={String(data?.window.pixCount ?? 0)} />
          <Metric label="Pagos no período" value={String(data?.window.paidCount ?? 0)} accent />
          <Metric label="Faturamento" value={currency(data?.window.revenue ?? 0)} accent />
          <Metric label="Ações registradas" value={String(data?.window.events ?? 0)} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Visitantes ativos">
          <div className="max-h-80 overflow-auto text-sm">
            {(data?.visitors ?? []).length === 0 ? (
              <p className="text-zinc-500">Ninguém na loja nesse período.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="py-1">Página</th>
                    <th className="py-1">Origem</th>
                    <th className="py-1">Local</th>
                    <th className="py-1">Aparelho</th>
                    <th className="py-1">Visto</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.visitors ?? []).map((visitor) => (
                    <tr key={visitor.sessionId} className="border-t border-zinc-800">
                      <td className="max-w-[160px] truncate py-1.5">{visitor.path}</td>
                      <td className="py-1.5 text-zinc-400">{String(visitor.source)}</td>
                      <td className="py-1.5 text-zinc-400">
                        {[visitor.city, visitor.country].filter(Boolean).join(" / ") || "-"}
                      </td>
                      <td className="py-1.5 text-zinc-400">{visitor.device}</td>
                      <td className="py-1.5 text-zinc-500">{time(visitor.at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        <Card title="Atividade em tempo real">
          <ul className="max-h-80 space-y-1 overflow-auto text-sm">
            {(data?.feed ?? []).map((item, index) => (
              <li key={`${item.at}-${index}`} className="flex justify-between gap-2 border-b border-zinc-800/70 py-1">
                <span className="text-zinc-300">
                  {item.type}
                  {item.title ? ` · ${item.title}` : ""}
                </span>
                <span className="text-zinc-500">{time(item.at)}</span>
              </li>
            ))}
            {(data?.feed ?? []).length === 0 ? <li className="text-zinc-500">Sem atividade.</li> : null}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RankList title="Páginas mais vistas" items={data?.topPages ?? []} />
        <RankList title="Origem do tráfego" items={data?.topSources ?? []} />
        <RankList title="Aparelhos" items={data?.topDevices ?? []} />
        <RankList title="Cidades" items={data?.topPlaces ?? []} />
      </div>

      <Card title="Últimos pedidos">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="py-1">Pedido</th>
                <th className="py-1">Cliente</th>
                <th className="py-1">Valor</th>
                <th className="py-1">Status</th>
                <th className="py-1">Criado</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentOrders ?? []).map((order) => (
                <tr key={order.referenceId} className="border-t border-zinc-800">
                  <td className="py-1.5 font-mono text-xs">{order.referenceId}</td>
                  <td className="py-1.5">{order.customer || "-"}</td>
                  <td className="py-1.5">{currency(order.amount)}</td>
                  <td className="py-1.5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-1.5 text-zinc-500">{time(order.createdAt)}</td>
                </tr>
              ))}
              {(data?.recentOrders ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-3 text-zinc-500">
                    Nenhum pedido ainda.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const paid = status === "paid";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs ${
        paid ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
      }`}
    >
      {paid ? "pago" : "aguardando"}
    </span>
  );
}

function SalesTab({
  funnel,
  series,
  devices,
  sources,
}: {
  funnel: Array<{ label: string; value: number }>;
  series: Array<{ date: string; pix: number; paid: number; revenue: number; sessions: number }>;
  devices: Array<{ label: string; value: number }>;
  sources: Array<{ label: string; value: number }>;
}) {
  const ordersFn = useServerFn(adminOrders);
  const checkFn = useServerFn(adminCheckOrder);
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const orders = useQuery({
    queryKey: ["admin-orders", status, search],
    queryFn: () => ordersFn({ data: { status, search, limit: 150 } }),
    refetchInterval: 20_000,
  });

  const check = useMutation({
    mutationFn: (order: { referenceId: string; transactionId?: string }) => checkFn({ data: order }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });

  const maxFunnel = Math.max(1, ...funnel.map((step) => step.value));
  const maxRevenue = Math.max(1, ...series.map((point) => point.revenue));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Funil de conversão">
          <div className="space-y-2">
            {funnel.map((step) => (
              <div key={step.label}>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>{step.label}</span>
                  <span>{step.value}</span>
                </div>
                <div className="mt-1 h-2 rounded bg-zinc-800">
                  <div
                    className="h-2 rounded bg-rose-500"
                    style={{ width: `${(step.value / maxFunnel) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Faturamento por dia">
          <div className="flex h-40 items-end gap-1">
            {series.map((point) => (
              <div key={point.date} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-emerald-500/70"
                  style={{ height: `${Math.max(2, (point.revenue / maxRevenue) * 130)}px` }}
                  title={`${point.date}: ${currency(point.revenue)} · ${point.paid} pagos`}
                />
                <span className="text-[10px] text-zinc-500">{point.date.slice(8)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Aparelhos">
          <ul className="space-y-1 text-sm text-zinc-300">
            {devices.map((item) => (
              <li key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <span className="text-zinc-500">{item.value}</span>
              </li>
            ))}
            {devices.length === 0 ? <li className="text-zinc-500">Sem dados.</li> : null}
          </ul>
        </Card>
        <Card title="Origem do tráfego">
          <ul className="space-y-1 text-sm text-zinc-300">
            {sources.map((item) => (
              <li key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <span className="text-zinc-500">{item.value}</span>
              </li>
            ))}
            {sources.length === 0 ? <li className="text-zinc-500">Sem dados.</li> : null}
          </ul>
        </Card>
      </div>

      <Card title="Pedidos">
        <div className="mb-3 flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm"
          >
            <option value="all">Todos</option>
            <option value="paid">Pagos</option>
            <option value="pending">Aguardando</option>
          </select>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por pedido, nome ou e-mail"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm"
          />
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="py-1">Pedido</th>
                <th className="py-1">Cliente</th>
                <th className="py-1">Itens</th>
                <th className="py-1">Valor</th>
                <th className="py-1">Status</th>
                <th className="py-1">TikTok</th>
                <th className="py-1">Criado</th>
                <th className="py-1"></th>
              </tr>
            </thead>
            <tbody>
              {(orders.data ?? []).map((order) => (
                <tr key={order.id} className="border-t border-zinc-800 align-top">
                  <td className="py-2 font-mono text-xs">{order.referenceId}</td>
                  <td className="py-2">
                    <div>{order.customer || "-"}</div>
                    <div className="text-xs text-zinc-500">{order.email}</div>
                    <div className="text-xs text-zinc-500">{order.place}</div>
                  </td>
                  <td className="py-2 text-xs text-zinc-400">
                    {(order.items as Array<{ titulo?: string; quantidade?: number }>).map(
                      (item, index) => (
                        <div key={index}>
                          {item.quantidade ?? 1}× {item.titulo ?? "Produto"}
                        </div>
                      ),
                    )}
                  </td>
                  <td className="py-2">{currency(order.amount)}</td>
                  <td className="py-2">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-2 text-xs">
                    {order.tiktokSent ? (
                      <span className="text-emerald-400">enviado</span>
                    ) : (
                      <span className="text-zinc-500">—</span>
                    )}
                  </td>
                  <td className="py-2 text-xs text-zinc-500">
                    <div>{time(order.createdAt)}</div>
                    {order.paidAt ? <div className="text-emerald-500">{time(order.paidAt)}</div> : null}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() =>
                        check.mutate({
                          referenceId: order.referenceId,
                          transactionId: order.transactionId ?? undefined,
                        })
                      }
                      className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-300"
                    >
                      Conferir
                    </button>
                  </td>
                </tr>
              ))}
              {(orders.data ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-3 text-zinc-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AbandonedTab({ days }: { days: number }) {
  const fetchFn = useServerFn(adminAbandonedCarts);
  const carts = useQuery({
    queryKey: ["admin-abandoned", days],
    queryFn: () => fetchFn({ data: { days } }),
    refetchInterval: 60_000,
  });
  const data = carts.data;
  const waLink = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    const full = digits.length <= 11 ? `55${digits}` : digits;
    return `https://wa.me/${full}`;
  };

  if (carts.isPending) return <Card title="Carrinhos abandonados"><p className="text-sm text-zinc-400">Carregando…</p></Card>;

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Pix nao pagos" value={String(data?.totals.pendingCount ?? 0)} />
        <Metric label="Valor a recuperar" value={currency(data?.totals.pendingValue ?? 0)} accent />
        <Metric label="Carrinhos sem Pix" value={String(data?.totals.abandonedSessions ?? 0)} />
        <Metric label="Taxa de abandono" value={`${(data?.totals.abandonRate ?? 0).toFixed(1)}%`} />
      </section>

      <Card title="Pix gerado e nao pago (com contato)">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="py-1">Cliente</th>
                <th className="py-1">Contato</th>
                <th className="py-1">Produtos</th>
                <th className="py-1">Valor</th>
                <th className="py-1">Local</th>
                <th className="py-1">Origem</th>
                <th className="py-1">Quando</th>
                <th className="py-1" />
              </tr>
            </thead>
            <tbody>
              {(data?.pendingOrders ?? []).map((order) => (
                <tr key={order.referenceId} className="border-t border-zinc-800 align-top">
                  <td className="py-2">{order.name || "-"}</td>
                  <td className="py-2 text-zinc-400">
                    <div>{order.phone || "-"}</div>
                    <div className="text-xs">{order.email || ""}</div>
                  </td>
                  <td className="py-2 text-zinc-300">
                    {order.items.map((item) => `${item.quantity}x ${item.title}`).join(", ") || "-"}
                  </td>
                  <td className="py-2 text-amber-400">{currency(order.value)}</td>
                  <td className="py-2 text-zinc-400">{order.place || "-"}</td>
                  <td className="py-2 text-zinc-400">{order.source}</td>
                  <td className="py-2 text-zinc-400">
                    {order.minutesAgo < 60 ? `${order.minutesAgo} min` : time(order.createdAt)}
                  </td>
                  <td className="py-2">
                    {order.phone ? (
                      <a
                        href={waLink(order.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
              {(data?.pendingOrders ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-3 text-zinc-500">
                    Nenhum Pix pendente neste periodo.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Colocou no carrinho e saiu sem gerar Pix">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="py-1">Produtos</th>
                <th className="py-1">Valor</th>
                <th className="py-1">Chegou ao checkout</th>
                <th className="py-1">Ultima pagina</th>
                <th className="py-1">Local</th>
                <th className="py-1">Aparelho</th>
                <th className="py-1">Origem</th>
                <th className="py-1">Visto</th>
              </tr>
            </thead>
            <tbody>
              {(data?.sessions ?? []).map((item) => (
                <tr key={item.sessionId} className="border-t border-zinc-800">
                  <td className="py-2 text-zinc-200">{item.products.join(", ")}</td>
                  <td className="py-2 text-amber-400">{item.value ? currency(item.value) : "-"}</td>
                  <td className="py-2">
                    {item.reachedCheckout ? (
                      <span className="text-rose-400">Sim</span>
                    ) : (
                      <span className="text-zinc-500">Nao</span>
                    )}
                  </td>
                  <td className="py-2 text-zinc-400">{item.lastPath}</td>
                  <td className="py-2 text-zinc-400">{item.place}</td>
                  <td className="py-2 text-zinc-400">{item.device}</td>
                  <td className="py-2 text-zinc-400">{item.source}</td>
                  <td className="py-2 text-zinc-400">
                    {item.minutesAgo < 60 ? `${item.minutesAgo} min` : time(item.lastSeen)}
                  </td>
                </tr>
              ))}
              {(data?.sessions ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-3 text-zinc-500">
                    Nenhum carrinho abandonado neste periodo.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductsTab({ days }: { days: number }) {
  const topFn = useServerFn(adminTopProducts);
  const products = useQuery({
    queryKey: ["admin-products", days],
    queryFn: () => topFn({ data: { days } }),
    refetchInterval: 60_000,
  });

  return (
    <Card title="Produtos mais vendidos">
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-zinc-500">
            <tr>
              <th className="py-1">Produto</th>
              <th className="py-1">Vendidos (pagos)</th>
              <th className="py-1">Pix gerados</th>
              <th className="py-1">Faturamento</th>
              <th className="py-1">Visitas</th>
              <th className="py-1">Carrinhos</th>
              <th className="py-1">Visita → venda</th>
            </tr>
          </thead>
          <tbody>
            {(products.data ?? []).map((product) => (
              <tr key={product.id} className="border-t border-zinc-800">
                <td className="py-2">{product.title}</td>
                <td className="py-2 text-emerald-400">{product.paidSold}</td>
                <td className="py-2">{product.sold}</td>
                <td className="py-2">{currency(product.revenue)}</td>
                <td className="py-2 text-zinc-400">{product.views}</td>
                <td className="py-2 text-zinc-400">{product.carts}</td>
                <td className="py-2 text-zinc-400">
                  {product.views ? `${((product.paidSold / product.views) * 100).toFixed(1)}%` : "-"}
                </td>
              </tr>
            ))}
            {(products.data ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="py-3 text-zinc-500">
                  Ainda sem dados de produtos.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function TikTokPixelForm() {
  const getFn = useServerFn(adminGetSettings);
  const saveFn = useServerFn(adminSaveSettings);
  const testFn = useServerFn(adminTestTikTokEvent);
  const queryClient = useQueryClient();
  const settings = useQuery({ queryKey: ["admin-settings"], queryFn: () => getFn({}) });

  const [pixelIds, setPixelIds] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [testEventCode, setTestEventCode] = useState<string | null>(null);
  const [serverEvents, setServerEvents] = useState<boolean | null>(null);
  const [trackPageview, setTrackPageview] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const currentPixelIds = pixelIds ?? (settings.data?.pixelIds ?? []).join(", ");
  const currentTestCode = testEventCode ?? settings.data?.testEventCode ?? "";
  const currentServerEvents = serverEvents ?? settings.data?.serverEventsEnabled ?? true;
  const currentTrackPageview = trackPageview ?? settings.data?.trackPageview ?? true;

  const save = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          pixelIds: currentPixelIds,
          accessToken,
          testEventCode: currentTestCode,
          serverEventsEnabled: currentServerEvents,
          trackPageview: currentTrackPageview,
        },
      }),
    onSuccess: () => {
      setAccessToken("");
      setMessage("Configuração salva. As páginas da loja já usam esse pixel.");
      void queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: () => setMessage("Não foi possível salvar."),
  });

  const test = useMutation({
    mutationFn: () => testFn({}),
    onSuccess: (result) => setMessage(result.message),
    onError: () => setMessage("Falha ao enviar o evento de teste."),
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Pixel do TikTok">
        <div className="space-y-3 text-sm">
          <label className="block">
            <span className="text-xs text-zinc-400">ID do pixel (separe por vírgula para vários)</span>
            <input
              value={currentPixelIds}
              onChange={(event) => setPixelIds(event.target.value)}
              placeholder="C1A2B3..."
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs text-zinc-400">
              Token de acesso da API de eventos {settings.data?.hasAccessToken ? "(salvo)" : ""}
            </span>
            <input
              value={accessToken}
              onChange={(event) => setAccessToken(event.target.value)}
              type="password"
              placeholder={settings.data?.hasAccessToken ? "••••••••" : "cole o token aqui"}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs text-zinc-400">Código de teste (opcional)</span>
            <input
              value={currentTestCode}
              onChange={(event) => setTestEventCode(event.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentServerEvents}
              onChange={(event) => setServerEvents(event.target.checked)}
            />
            <span>Marcar vendas pelo servidor (recomendado)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentTrackPageview}
              onChange={(event) => setTrackPageview(event.target.checked)}
            />
            <span>Contar visitas de página no pixel</span>
          </label>
          {message ? <p className="text-emerald-400">{message}</p> : null}
          <div className="flex gap-2">
            <button
              onClick={() => save.mutate()}
              disabled={save.isPending}
              className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {save.isPending ? "Salvando…" : "Salvar"}
            </button>
            <button
              onClick={() => test.mutate()}
              disabled={test.isPending}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm"
            >
              Enviar evento de teste
            </button>
          </div>
        </div>
      </Card>

      <Card title="Como funciona a marcação de vendas">
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• O pixel é carregado em todas as páginas da loja com o ID salvo aqui.</li>
          <li>• Quando o cliente gera o Pix, o evento de início de compra é enviado.</li>
          <li>• Quando o pagamento é confirmado, a venda é marcada pelo servidor com o valor real.</li>
          <li>• Cada venda usa um identificador único, então o TikTok não conta duas vezes.</li>
          <li>• Pedidos já enviados aparecem como “enviado” na aba Vendas.</li>
        </ul>
      </Card>
    </div>
  );
}

function MetaPixelForm() {
  const getFn = useServerFn(adminGetMetaSettings);
  const saveFn = useServerFn(adminSaveMetaSettings);
  const testFn = useServerFn(adminTestMetaEvent);
  const queryClient = useQueryClient();
  const settings = useQuery({ queryKey: ["admin-meta-settings"], queryFn: () => getFn({}) });

  const [pixelIds, setPixelIds] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [testEventCode, setTestEventCode] = useState<string | null>(null);
  const [serverEvents, setServerEvents] = useState<boolean | null>(null);
  const [trackPageview, setTrackPageview] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const currentPixelIds = pixelIds ?? (settings.data?.pixelIds ?? []).join(", ");
  const currentTestCode = testEventCode ?? settings.data?.testEventCode ?? "";
  const currentServerEvents = serverEvents ?? settings.data?.serverEventsEnabled ?? true;
  const currentTrackPageview = trackPageview ?? settings.data?.trackPageview ?? true;

  const save = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          pixelIds: currentPixelIds,
          accessToken,
          testEventCode: currentTestCode,
          serverEventsEnabled: currentServerEvents,
          trackPageview: currentTrackPageview,
        },
      }),
    onSuccess: () => {
      setAccessToken("");
      setMessage("Configuração do Facebook salva. A loja já carrega esse pixel.");
      void queryClient.invalidateQueries({ queryKey: ["admin-meta-settings"] });
    },
    onError: () => setMessage("Não foi possível salvar."),
  });

  const test = useMutation({
    mutationFn: () => testFn({}),
    onSuccess: (result) => setMessage(result.message),
    onError: () => setMessage("Falha ao enviar o evento de teste."),
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Pixel do Facebook / Instagram">
        <div className="space-y-3 text-sm">
          <label className="block">
            <span className="text-xs text-zinc-400">ID do pixel (separe por vírgula para vários)</span>
            <input
              value={currentPixelIds}
              onChange={(event) => setPixelIds(event.target.value)}
              placeholder="123456789012345"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs text-zinc-400">
              Token da API de conversões {settings.data?.hasAccessToken ? "(salvo)" : ""}
            </span>
            <input
              value={accessToken}
              onChange={(event) => setAccessToken(event.target.value)}
              type="password"
              placeholder={settings.data?.hasAccessToken ? "••••••••" : "cole o token aqui"}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs text-zinc-400">Código de teste (opcional)</span>
            <input
              value={currentTestCode}
              onChange={(event) => setTestEventCode(event.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentServerEvents}
              onChange={(event) => setServerEvents(event.target.checked)}
            />
            <span>Marcar vendas pelo servidor (recomendado)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentTrackPageview}
              onChange={(event) => setTrackPageview(event.target.checked)}
            />
            <span>Contar visitas de página no pixel</span>
          </label>
          {message ? <p className="text-emerald-400">{message}</p> : null}
          <div className="flex gap-2">
            <button
              onClick={() => save.mutate()}
              disabled={save.isPending}
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {save.isPending ? "Salvando…" : "Salvar"}
            </button>
            <button
              onClick={() => test.mutate()}
              disabled={test.isPending}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm"
            >
              Enviar evento de teste
            </button>
          </div>
        </div>
      </Card>

      <Card title="O que é enviado ao Facebook">
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Visita de página, produto visto, carrinho e início de compra pelo navegador.</li>
          <li>• Início de compra e compra confirmada também pelo servidor, com o valor real.</li>
          <li>• E-mail e telefone são enviados embaralhados, nunca abertos.</li>
          <li>• O clique do anúncio é guardado para o Facebook reconhecer a venda.</li>
          <li>• Cada venda tem um código único, então não conta duas vezes.</li>
        </ul>
      </Card>
    </div>
  );
}

function PixelTab() {
  return (
    <div className="space-y-6">
      <TikTokPixelForm />
      <MetaPixelForm />
    </div>
  );
}

function Trend({ label, now, before, growth, money }: { label: string; now: number; before: number; growth: number; money?: boolean }) {
  const up = growth >= 0;
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-zinc-100">
        {money ? currency(now) : now}
      </p>
      <p className={`text-xs ${up ? "text-emerald-400" : "text-rose-400"}`}>
        {up ? "▲" : "▼"} {Math.abs(growth).toFixed(1)}% vs período anterior ({money ? currency(before) : before})
      </p>
    </div>
  );
}

function AttributionTable({ title, rows }: { title: string; rows: Array<{ label: string; sessions: number; pix: number; paid: number; revenue: number; conversion: number }> }) {
  return (
    <Card title={title}>
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-zinc-500">
            <tr>
              <th className="py-1">Origem</th>
              <th className="py-1">Visitantes</th>
              <th className="py-1">Pix</th>
              <th className="py-1">Pagos</th>
              <th className="py-1">Faturamento</th>
              <th className="py-1">Conversão</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-zinc-800">
                <td className="max-w-[180px] truncate py-1.5">{row.label}</td>
                <td className="py-1.5 text-zinc-400">{row.sessions}</td>
                <td className="py-1.5 text-zinc-400">{row.pix}</td>
                <td className="py-1.5 text-emerald-400">{row.paid}</td>
                <td className="py-1.5">{currency(row.revenue)}</td>
                <td className="py-1.5 text-zinc-400">{row.conversion.toFixed(2)}%</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-3 text-zinc-500">
                  Sem dados no período.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AnalyticsTab({ days }: { days: number }) {
  const analyticsFn = useServerFn(adminAnalytics);
  const analytics = useQuery({
    queryKey: ["admin-analytics", days],
    queryFn: () => analyticsFn({ data: { days } }),
    refetchInterval: 60_000,
  });
  const data = analytics.data;

  if (!data) {
    return <Card title="Análises"><p className="text-sm text-zinc-400">Carregando análises…</p></Card>;
  }

  const maxHour = Math.max(1, ...data.hours.map((hour) => hour.revenue));
  const maxWeekday = Math.max(1, ...data.weekdays.map((day) => day.revenue));

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Trend label="Faturamento" money {...data.comparison.revenue} />
        <Trend label="Vendas pagas" {...data.comparison.paid} />
        <Trend label="Pix gerados" {...data.comparison.pix} />
        <Trend label="Visitantes" {...data.comparison.sessions} />
      </section>

      <Card title="Funil detalhado (com perdas)">
        <div className="space-y-3">
          {data.funnel.map((step) => (
            <div key={step.label}>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{step.label}</span>
                <span>
                  {step.value} · {step.stepRate.toFixed(1)}% da etapa anterior · {step.totalRate.toFixed(1)}% do total
                  {step.lost ? ` · ${step.lost} desistiram` : ""}
                </span>
              </div>
              <div className="mt-1 h-2 rounded bg-zinc-800">
                <div className="h-2 rounded bg-rose-500" style={{ width: `${Math.min(100, step.totalRate)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Melhores horários (faturamento)">
          <div className="flex h-40 items-end gap-[2px]">
            {data.hours.map((hour) => (
              <div key={hour.hour} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-emerald-500/70"
                  style={{ height: `${Math.max(2, (hour.revenue / maxHour) * 120)}px` }}
                  title={`${hour.hour}h: ${currency(hour.revenue)} · ${hour.paid} pagos · ${hour.sessions} visitantes`}
                />
                <span className="text-[9px] text-zinc-500">{hour.hour}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Dias da semana">
          <div className="flex h-40 items-end gap-2">
            {data.weekdays.map((day) => (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-sky-500/70"
                  style={{ height: `${Math.max(2, (day.revenue / maxWeekday) * 120)}px` }}
                  title={`${day.label}: ${currency(day.revenue)} · ${day.paid} pagos`}
                />
                <span className="text-[10px] text-zinc-500">{day.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Metric label="Abandono do carrinho" value={`${data.abandonment.cartAbandonRate.toFixed(1)}%`} />
        <Metric label="Abandono do checkout" value={`${data.abandonment.checkoutAbandonRate.toFixed(1)}%`} />
        <Metric label="Pix aguardando" value={`${data.payment.pendingCount} · ${currency(data.payment.pendingValue)}`} />
        <Metric
          label="Tempo até pagar"
          value={`${data.payment.medianMinutes.toFixed(0)} min (média ${data.payment.averageMinutes.toFixed(0)})`}
        />
      </div>

      <AttributionTable title="Por origem" rows={data.sources} />
      <AttributionTable title="Por campanha" rows={data.campaigns} />
      <AttributionTable title="Por mídia" rows={data.mediums} />

      <div className="grid gap-4 lg:grid-cols-3">
        <RankList title="Páginas mais vistas" items={data.topPages.map((page) => ({ label: page.label, value: page.views }))} />
        <Card title="Cidades que mais compram">
          <ul className="space-y-1 text-sm text-zinc-300">
            {data.places.map((place) => (
              <li key={place.label} className="flex justify-between gap-2">
                <span className="truncate">{place.label}</span>
                <span className="text-zinc-500">
                  {place.paid} pagos · {currency(place.revenue)}
                </span>
              </li>
            ))}
            {data.places.length === 0 ? <li className="text-zinc-500">Sem dados.</li> : null}
          </ul>
        </Card>
        <Card title="Faixas de ticket">
          <ul className="space-y-1 text-sm text-zinc-300">
            {data.ticketBuckets.map((bucket) => (
              <li key={bucket.label} className="flex justify-between gap-2">
                <span>{bucket.label}</span>
                <span className="text-zinc-500">
                  {bucket.paid} · {currency(bucket.revenue)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
