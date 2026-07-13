const companies = {
    apex: {
        name: "Apex Retirement Services",
        years: [
            { year: 2020, revenue: 860, expense: 682 },
            { year: 2021, revenue: 924, expense: 718 },
            { year: 2022, revenue: 998, expense: 761 },
            { year: 2023, revenue: 1088, expense: 817 },
            { year: 2024, revenue: 1172, expense: 872 },
            { year: 2025, revenue: 1265, expense: 931 }
        ],
        mix: [
            { label: "Operations", value: 34 },
            { label: "Technology", value: 24 },
            { label: "Distribution", value: 18 },
            { label: "Corporate", value: 14 },
            { label: "Risk and Compliance", value: 10 }
        ]
    },
    harbor: {
        name: "Harbor Insurance Group",
        years: [
            { year: 2020, revenue: 1320, expense: 1088 },
            { year: 2021, revenue: 1384, expense: 1126 },
            { year: 2022, revenue: 1448, expense: 1168 },
            { year: 2023, revenue: 1536, expense: 1219 },
            { year: 2024, revenue: 1618, expense: 1278 },
            { year: 2025, revenue: 1712, expense: 1344 }
        ],
        mix: [
            { label: "Claims Operations", value: 31 },
            { label: "Technology", value: 22 },
            { label: "Customer Service", value: 19 },
            { label: "Corporate", value: 16 },
            { label: "Compliance", value: 12 }
        ]
    },
    summit: {
        name: "Summit Wealth Platform",
        years: [
            { year: 2020, revenue: 540, expense: 432 },
            { year: 2021, revenue: 601, expense: 464 },
            { year: 2022, revenue: 653, expense: 492 },
            { year: 2023, revenue: 725, expense: 528 },
            { year: 2024, revenue: 812, expense: 577 },
            { year: 2025, revenue: 894, expense: 631 }
        ],
        mix: [
            { label: "Product", value: 28 },
            { label: "Technology", value: 27 },
            { label: "Sales", value: 19 },
            { label: "Client Success", value: 15 },
            { label: "Corporate", value: 11 }
        ]
    }
};

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupDashboard();
    setupReveals();
    setupCounters();
    setupNavShadow();
});

function setupReveals() {
    const elements = [...document.querySelectorAll(".reveal, .reveal-right")];
    if (reducedMotion || !("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("revealed"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const group = el.closest(".stagger-group");
            if (group) {
                const siblings = [...group.querySelectorAll(".reveal, .reveal-right")];
                el.style.setProperty("--reveal-delay", `${siblings.indexOf(el) * 0.1}s`);
            }
            el.classList.add("revealed");
            observer.unobserve(el);
        });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));
}

function setupCounters() {
    const counters = [...document.querySelectorAll("[data-count]")];
    if (!counters.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const animate = (el) => {
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
}

function setupNavShadow() {
    const nav = document.querySelector("#nav");
    const update = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", update, { passive: true });
    update();
}

function setupNavigation() {
    const toggle = document.querySelector("#nav-toggle");
    const menu = document.querySelector("#nav-menu");
    const links = [...document.querySelectorAll(".nav-link")];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
}

function setupDashboard() {
    const select = document.querySelector("#company-select");
    setupDragAndDrop();
    select.addEventListener("change", () => renderDashboard(select.value));
    renderDashboard(select.value);
}

function forecastCompany(company) {
    const actuals = company.years.map((row) => ({ ...row, type: "Actual" }));
    const revenueGrowth = trailingGrowth(actuals, "revenue");
    const expenseGrowth = trailingGrowth(actuals, "expense");
    const last = actuals[actuals.length - 1];
    const forecast = [];
    let revenue = last.revenue;
    let expense = last.expense;

    for (let i = 1; i <= 3; i += 1) {
        revenue = Math.round(revenue * (1 + revenueGrowth));
        expense = Math.round(expense * (1 + expenseGrowth));
        forecast.push({
            year: last.year + i,
            revenue,
            expense,
            type: "Forecast"
        });
    }

    return { rows: [...actuals, ...forecast], revenueGrowth, expenseGrowth };
}

function trailingGrowth(rows, key) {
    const rates = [];
    for (let i = rows.length - 3; i < rows.length; i += 1) {
        rates.push((rows[i][key] - rows[i - 1][key]) / rows[i - 1][key]);
    }
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}

function renderDashboard(companyKey) {
    const company = companies[companyKey];
    const model = forecastCompany(company);
    const actuals = model.rows.filter((row) => row.type === "Actual");
    const latest = actuals[actuals.length - 1];
    const prior = actuals[actuals.length - 2];
    const margin = (latest.revenue - latest.expense) / latest.revenue;
    const priorMargin = (prior.revenue - prior.expense) / prior.revenue;
    const forecastEnd = model.rows[model.rows.length - 1];

    renderKpis([
        { label: "Revenue", value: `$${fmt.format(latest.revenue)}M`, note: `${growth(latest.revenue, prior.revenue)} YoY` },
        { label: "Operating Expense", value: `$${fmt.format(latest.expense)}M`, note: `${growth(latest.expense, prior.expense)} YoY` },
        { label: "Operating Margin", value: `${pct.format(margin * 100)}%`, note: `${signed((margin - priorMargin) * 100)} pts YoY` },
        { label: "3Y Forecast Revenue", value: `$${fmt.format(forecastEnd.revenue)}M`, note: `${pct.format(model.revenueGrowth * 100)}% moving avg` },
        { label: "Forecast Expense", value: `$${fmt.format(forecastEnd.expense)}M`, note: `${pct.format(model.expenseGrowth * 100)}% moving avg` }
    ]);
    renderTrendChart(model.rows);
    renderExpenseMix(company.mix);
    renderInsights(company, model, margin);
    renderTable(model.rows);
}

function renderKpis(items) {
    document.querySelector("#kpi-grid").innerHTML = items.map((item) => `
        <div class="kpi-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
            <small>${item.note}</small>
        </div>
    `).join("");
}

function renderTrendChart(rows) {
    const svg = document.querySelector("#trend-chart");
    const width = 760;
    const height = 320;
    const pad = { left: 58, right: 22, top: 26, bottom: 42 };
    const max = Math.max(...rows.flatMap((row) => [row.revenue, row.expense])) * 1.08;
    const min = Math.min(...rows.flatMap((row) => [row.revenue, row.expense])) * .92;
    const x = (index) => pad.left + (index * (width - pad.left - pad.right)) / (rows.length - 1);
    const y = (value) => height - pad.bottom - ((value - min) / (max - min)) * (height - pad.top - pad.bottom);

    const revenueActual = rows.filter((row) => row.type === "Actual").map((row, index) => [x(index), y(row.revenue)]);
    const expenseActual = rows.filter((row) => row.type === "Actual").map((row, index) => [x(index), y(row.expense)]);
    const actualCount = revenueActual.length;
    const revenueForecast = rows.slice(actualCount - 1).map((row, index) => [x(index + actualCount - 1), y(row.revenue)]);
    const expenseForecast = rows.slice(actualCount - 1).map((row, index) => [x(index + actualCount - 1), y(row.expense)]);
    const grid = [0, .25, .5, .75, 1].map((tick) => {
        const yy = pad.top + tick * (height - pad.top - pad.bottom);
        const value = max - tick * (max - min);
        return `<line class="axis" x1="${pad.left}" y1="${yy}" x2="${width - pad.right}" y2="${yy}"></line><text class="chart-label" x="8" y="${yy + 4}">$${fmt.format(value)}M</text>`;
    }).join("");
    const labels = rows.map((row, index) => `<text class="chart-label" x="${x(index) - 16}" y="${height - 12}">${row.year}</text>`).join("");

    svg.innerHTML = `
        ${grid}
        <line class="axis" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line>
        <line x1="${x(actualCount - 1)}" y1="${pad.top}" x2="${x(actualCount - 1)}" y2="${height - pad.bottom}" stroke="#94a3b8" stroke-dasharray="5 6"></line>
        <text class="chart-label" x="${x(actualCount - 1) + 10}" y="${pad.top + 12}">Forecast</text>
        <path class="line-revenue draw-line" pathLength="1" d="${pathFromPoints(revenueActual)}"></path>
        <path class="line-revenue forecast fade-line" d="${pathFromPoints(revenueForecast)}"></path>
        <path class="line-expense draw-line" pathLength="1" d="${pathFromPoints(expenseActual)}"></path>
        <path class="line-expense forecast fade-line" d="${pathFromPoints(expenseForecast)}"></path>
        ${labels}
        <text x="${width - 186}" y="28" fill="#2457d6" font-size="14" font-weight="800">Revenue</text>
        <text x="${width - 92}" y="28" fill="#0f9f8d" font-size="14" font-weight="800">Expense</text>
    `;
}

function pathFromPoints(points) {
    return points.map((point, index) => `${index === 0 ? "M" : "L"}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(" ");
}

function renderExpenseMix(mix) {
    document.querySelector("#expense-mix").innerHTML = mix.map((item) => `
        <div class="bar-row">
            <div class="bar-label"><span>${item.label}</span><span>${item.value}%</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${item.value}%"></div></div>
        </div>
    `).join("");
}

function renderInsights(company, model, margin) {
    const latestActual = model.rows.filter((row) => row.type === "Actual").at(-1);
    const finalForecast = model.rows.at(-1);
    const incomeLift = (finalForecast.revenue - finalForecast.expense) - (latestActual.revenue - latestActual.expense);
    const expenseGap = model.revenueGrowth - model.expenseGrowth;
    const message = expenseGap > 0
        ? "Revenue trend is outpacing expense trend, creating operating leverage in the forecast."
        : "Expense trend is running ahead of revenue trend, making productivity actions important.";

    document.querySelector("#insights-list").innerHTML = [
        `${company.name} exits the latest actual year at ${pct.format(margin * 100)}% operating margin.`,
        `Projected operating income improves by $${fmt.format(incomeLift)}M by year three under the moving-average trend.`,
        message,
        "Widget order is saved locally after drag-and-drop so each viewer can shape the executive readout."
    ].map((item) => `<li>${item}</li>`).join("");
}

function renderTable(rows) {
    document.querySelector("#financial-table").innerHTML = rows.map((row) => {
        const income = row.revenue - row.expense;
        const margin = income / row.revenue;
        return `
            <tr class="${row.type === "Forecast" ? "forecast-row" : ""}">
                <td>${row.year}</td>
                <td>${row.type}</td>
                <td>$${fmt.format(row.revenue)}</td>
                <td>$${fmt.format(row.expense)}</td>
                <td>$${fmt.format(income)}</td>
                <td>${pct.format(margin * 100)}%</td>
            </tr>
        `;
    }).join("");
}

function growth(current, prior) {
    return `${signed(((current - prior) / prior) * 100)}%`;
}

function signed(value) {
    return `${value >= 0 ? "+" : ""}${pct.format(value)}`;
}

function setupDragAndDrop() {
    const grid = document.querySelector("#widget-grid");
    const saved = JSON.parse(localStorage.getItem("dashboardWidgetOrder") || "[]");
    saved.forEach((id) => {
        const widget = grid.querySelector(`[data-widget-id="${id}"]`);
        if (widget) grid.appendChild(widget);
    });

    let dragged = null;
    grid.querySelectorAll(".dashboard-widget").forEach((widget) => {
        widget.addEventListener("dragstart", () => {
            dragged = widget;
            widget.classList.add("dragging");
        });
        widget.addEventListener("dragend", () => {
            widget.classList.remove("dragging");
            dragged = null;
            saveWidgetOrder(grid);
        });
    });

    grid.addEventListener("dragover", (event) => {
        event.preventDefault();
        const after = getDragAfterElement(grid, event.clientY);
        if (!dragged) return;
        if (after == null) {
            grid.appendChild(dragged);
        } else {
            grid.insertBefore(dragged, after);
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".dashboard-widget:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveWidgetOrder(grid) {
    const order = [...grid.querySelectorAll(".dashboard-widget")].map((widget) => widget.dataset.widgetId);
    localStorage.setItem("dashboardWidgetOrder", JSON.stringify(order));
}
