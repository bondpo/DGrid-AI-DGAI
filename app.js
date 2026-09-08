import { tokenomicsData, simulationTimeline } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initCounters();
    initTokenomics();
    initSimulation();
    initTabs();
    initDrawer();
    initGlobalActions();
});

function initCounters() {
    animateValue('stat-revenue', 0, 23000000, 2000, true);
    animateValue('stat-volume', 0, 112, 1800, false);
}

function animateValue(id, start, end, duration, isCurrency) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const startTime = performance.now();

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        current = Math.floor(progress * range + start);
        if (isCurrency) {
            obj.textContent = current.toLocaleString('en-US');
        } else {
            obj.textContent = current;
        }
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (isCurrency) {
                obj.textContent = end.toLocaleString('en-US');
            } else {
                obj.textContent = end;
            }
        }
    }
    requestAnimationFrame(step);
}

function initTokenomics() {
    const keyMap = {
        'arc-node': 'node',
        'arc-community': 'community',
        'arc-team': 'team',
        'arc-seed': 'seed',
        'arc-airdrop': 'airdrop',
        'arc-liquidity': 'liquidity',
        'btn-tab-node': 'node',
        'btn-tab-community': 'community',
        'btn-tab-team': 'team',
        'btn-tab-seed': 'seed',
        'btn-tab-airdrop': 'airdrop',
        'btn-tab-liquidity': 'liquidity'
    };

    Object.keys(keyMap).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', () => {
                const key = keyMap[id];
                updateTokenomicsDetail(key);
                highlightActiveTab(key);
            });
        }
    });
}

function updateTokenomicsDetail(key) {
    const data = tokenomicsData[key];
    if (!data) return;

    const detailCard = document.getElementById('tokenomics-detail-card');
    const title = document.getElementById('token-detail-title');
    const badge = document.getElementById('token-detail-badge');
    const desc = document.getElementById('token-detail-desc');
    const unlock = document.getElementById('token-detail-unlock');
    const count = document.getElementById('token-detail-count');

    gsap.to(detailCard, { opacity: 0, y: 10, duration: 0.15, onComplete: () => {
        title.textContent = data.title;
        badge.textContent = data.badge;
        desc.textContent = data.desc;
        unlock.textContent = data.unlock;
        count.textContent = data.count;

        gsap.to(detailCard, { opacity: 1, y: 0, duration: 0.25 });
    }});
}

function highlightActiveTab(activeKey) {
    const tabs = document.querySelectorAll('.tokenomics-tab-btn');
    tabs.forEach(tab => {
        const tabKey = tab.id.replace('btn-tab-', '');
        if (tabKey === activeKey) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    const circles = ['arc-node', 'arc-community', 'arc-team', 'arc-seed', 'arc-airdrop', 'arc-liquidity'];
    circles.forEach(cid => {
        const circle = document.getElementById(cid);
        if (!circle) return;
        const circleKey = cid.replace('arc-', '');
        if (circleKey === activeKey) {
            circle.style.strokeWidth = '16';
        } else {
            circle.style.strokeWidth = '12';
        }
    });
}

function initSimulation() {
    const runBtn = document.getElementById('btn-run-simulation');
    if (!runBtn) return;

    runBtn.addEventListener('click', () => {
        runBtn.disabled = true;
        runBtn.classList.add('opacity-50');
        
        const devNode = document.getElementById('sim-node-dev');
        const gatewayNode = document.getElementById('sim-node-gateway');
        const workerNode = document.getElementById('sim-worker-2');
        const workerStatus = document.getElementById('sim-worker-2-status');
        const statusText = document.getElementById('sim-status-text');
        const feedback = document.getElementById('sim-feedback-val');

        gsap.to(devNode, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        statusText.textContent = simulationTimeline[0].text;
        feedback.textContent = "网关分析中...";

        setTimeout(() => {
            gsap.to(gatewayNode, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
            statusText.textContent = simulationTimeline[1].text;
        }, simulationTimeline[0].delay);

        setTimeout(() => {
            statusText.textContent = simulationTimeline[2].text;
            workerNode.classList.remove('border-white/10');
            workerNode.classList.add('border-purple-500/50', 'bg-purple-500/5');
            workerStatus.textContent = "RUNNING";
            workerStatus.className = "text-[9px] text-purple-400 font-mono font-bold animate-pulse";
        }, simulationTimeline[1].delay);

        setTimeout(() => {
            statusText.textContent = simulationTimeline[3].text;
            feedback.textContent = "质量密码校验中...";
            feedback.className = "font-mono text-purple-400";
        }, simulationTimeline[2].delay);

        setTimeout(() => {
            statusText.textContent = simulationTimeline[4].text;
            feedback.textContent = "校验完成: 节省成本 68%";
            feedback.className = "font-mono text-emerald-400 font-bold";

            gsap.to(devNode, { scale: 1.05, border: "1px solid rgba(16, 185, 129, 0.4)", duration: 0.3 });
            
            setTimeout(() => {
                resetSimulation();
            }, 3000);
        }, simulationTimeline[3].delay);
    });
}

function resetSimulation() {
    const runBtn = document.getElementById('btn-run-simulation');
    const devNode = document.getElementById('sim-node-dev');
    const workerNode = document.getElementById('sim-worker-2');
    const workerStatus = document.getElementById('sim-worker-2-status');
    const statusText = document.getElementById('sim-status-text');
    const feedback = document.getElementById('sim-feedback-val');

    if (!runBtn) return;

    runBtn.disabled = false;
    runBtn.classList.remove('opacity-50');

    devNode.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    workerNode.className = "p-3 rounded-lg bg-[#0B0D17] border border-white/10 flex items-center justify-between transition-all";
    workerStatus.textContent = "IDLE";
    workerStatus.className = "text-[9px] text-slate-500 font-mono";
    statusText.textContent = "就绪 - 等待触发";
    feedback.textContent = "等待触发";
    feedback.className = "font-mono text-slate-400";
}

function initTabs() {
    const tabKeys = ['1', '2', '3', '4'];
    tabKeys.forEach(key => {
        const btn = document.getElementById(`path-tab-${key}`);
        const content = document.getElementById(`path-content-${key}`);

        if (btn && content) {
            btn.addEventListener('click', () => {
                tabKeys.forEach(k => {
                    document.getElementById(`path-tab-${k}`).classList.remove('active');
                    document.getElementById(`path-content-${k}`).classList.add('hidden');
                });

                btn.classList.add('active');
                content.classList.remove('hidden');

                gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            });
        }
    });

    const copyBtn = document.getElementById('btn-copy-code');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const codeText = "dgai-node register --wallet 0x71C...3a9 --gpu auto --stake 5000\ndgai-node start --network mainnet --log-level info";
            navigator.clipboard.writeText(codeText).then(() => {
                showToast("代码已成功复制至剪贴板！");
            });
        });
    }
}

function initDrawer() {
    const toggleBtn = document.getElementById('btn-menu-toggle');
    const closeBtn = document.getElementById('btn-drawer-close');
    const drawer = document.getElementById('drawer-menu');
    const links = document.querySelectorAll('.drawer-link');

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', () => {
            drawer.classList.remove('translate-x-full');
        });
    }

    if (closeBtn && drawer) {
        closeBtn.addEventListener('click', () => {
            drawer.classList.add('translate-x-full');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (drawer) drawer.classList.add('translate-x-full');
        });
    });
}

function initGlobalActions() {
    const shareIds = ['btn-mock-share', 'btn-drawer-share'];
    shareIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                const dummyUrl = window.location.href;
                navigator.clipboard.writeText(dummyUrl).then(() => {
                    showToast("报告链接已复制，随时可发给好友！");
                });
            });
        }
    });

    const pdfIds = ['btn-mock-pdf', 'btn-drawer-pdf'];
    pdfIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                showToast("投研 PDF 报告正在打包下载中，请稍候...");
            });
        }
    });
}

function showToast(text) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = text;
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
    toast.style.pointerEvents = "auto";

    setTimeout(() => {
        toast.style.transform = "translateY(80px)";
        toast.style.opacity = "0";
        toast.style.pointerEvents = "none";
    }, 3000);
}
