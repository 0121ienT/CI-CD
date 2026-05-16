const statusEl = document.querySelector("#status");
const form = document.querySelector("#orderForm");
const ordersEl = document.querySelector("#orders");
const totalOrdersEl = document.querySelector("#totalOrders");
const totalItemsEl = document.querySelector("#totalItems");
const statsSourceEl = document.querySelector("#statsSource");
const refreshButton = document.querySelector("#refreshButton");

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Request failed: ${response.status}`);
  }

  return data;
}

function renderOrders(orders) {
  if (orders.length === 0) {
    ordersEl.innerHTML = "<p class=\"empty\">No orders yet. Create the first one.</p>";
    return;
  }

  ordersEl.innerHTML = orders
    .map(
      (order) => `
        <article class="order">
          <div>
            <strong>${order.item}</strong>
            <span>${order.customer}</span>
          </div>
          <div>
            <strong>x${order.quantity}</strong>
            <span>${new Date(order.created_at).toLocaleTimeString()}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

async function refreshHealth() {
  try {
    const health = await fetchJson("/health");
    statusEl.textContent = `API ${health.checks.api} | DB ${health.checks.database} | Redis ${health.checks.redis}`;
    statusEl.className = "status ok";
  } catch (error) {
    statusEl.textContent = error.message;
    statusEl.className = "status bad";
  }
}

async function refreshOrders() {
  const [{ orders }, statsPayload] = await Promise.all([
    fetchJson("/api/orders"),
    fetchJson("/api/stats"),
  ]);

  renderOrders(orders);
  totalOrdersEl.textContent = statsPayload.stats.total_orders;
  totalItemsEl.textContent = statsPayload.stats.total_items;
  statsSourceEl.textContent = statsPayload.source;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  await fetchJson("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: formData.get("customer"),
      item: formData.get("item"),
      quantity: Number(formData.get("quantity")),
    }),
  });

  await refreshOrders();
});

refreshButton.addEventListener("click", refreshOrders);

await refreshHealth();
await refreshOrders();
