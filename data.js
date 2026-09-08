export const tokenomicsData = {
    node: {
        title: "50% - 节点运营商与基础设施提供商",
        badge: "长期分配",
        desc: "10年内线性平滑释放。这部分是代币的最大产出源，用以保障全球去中心化算力节点的长期稳定性及推理请求运行顺畅。",
        unlock: "10 年线性释放",
        count: "5 亿枚 DGAI"
    },
    community: {
        title: "15% - 社区发展与生态基金",
        badge: "社区共享",
        desc: "锁仓6个月后，将在2年内按季度线性稀释。用于生态合作拓展、开发者训练赛、早期用户黑客松以及各类营销计划。",
        unlock: "锁仓 6 个月，2 年线性释放",
        count: "1.5 亿枚 DGAI"
    },
    team: {
        title: "10% - 创始及核心技术团队",
        badge: "团队锁仓",
        desc: "锁仓1年后，在2年内按月线性释放。长效的锁仓设计确保团队核心骨干的利益与代币长期二级市场价值绑定。",
        unlock: "锁仓 1 年，2 年月度线性释放",
        count: "1 亿枚 DGAI"
    },
    seed: {
        title: "10% - 种子轮及早期VC投资人",
        badge: "私募认购",
        desc: "锁仓1年后，在2年内按月线性解锁。极力避免了私募廉价筹码在 TGE 首日或前几个月对二级市场产生瞬时砸盘。",
        unlock: "锁仓 1 年，2 年线性释放",
        count: "1 亿枚 DGAI"
    },
    airdrop: {
        title: "8% - 社区贡献空投基金",
        badge: "完全无锁",
        desc: "一部分在 TGE (代币生成事件) 当天开放申领，后续部分结合测试网、节点压力测试及社区忠诚度活动进行发放。",
        unlock: "首发及测试积分任务兑换",
        count: "8000 万枚 DGAI"
    },
    liquidity: {
        title: "7% - 初始流动性支持",
        badge: "全额释放",
        desc: "于各大主流去中心化和中心化交易平台（如Gate、MEXC等）直接充当做市底仓，维护开盘价格平稳及极低滑点度。",
        unlock: "TGE 100% 释放",
        count: "7000 万枚 DGAI"
    }
};

export const simulationTimeline = [
    { text: "正在向 DGrid 网关递交推理运算需求...", delay: 600 },
    { text: "正在使用智能路由在全网探测最低延迟节点...", delay: 1200 },
    { text: "匹配成功：最优算力节点 B (H100)", delay: 1800 },
    { text: "PoQ 零知识质量证明校验中...", delay: 2400 },
    { text: "校验通过！推理数据安全反馈给开发者", delay: 3000 }
];
