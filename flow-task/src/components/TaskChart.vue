<template>
  <div class="card p-5">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
        任务状态分布
      </h2>

      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        根据当前任务状态统计
      </p>
    </div>

    <div v-if="total > 0" ref="chartElement" class="h-72 w-full" />

    <div v-else class="flex h-72 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      暂无数据
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

import * as echarts from 'echarts'

const props = defineProps<{
  completed: number
  pending: number
  overdue: number
}>()

const chartElement =
  ref<HTMLDivElement | null>(null)

let chart: echarts.ECharts | null = null

const total = computed(() => {
  return (
    props.completed +
    props.pending +
    props.overdue
  )
})

function renderChart(): void {
  if (!chart) {
    return
  }

  const isDark =
    document.documentElement.classList.contains(
      'dark'
    )

  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 0,
      textStyle: {
        color: isDark ? '#cbd5e1' : '#475569'
      }
    },
    series: [
      {
        name: '任务状态',
        type: 'pie',
        radius: ['46%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: isDark
            ? '#0f172a'
            : '#ffffff',
          borderWidth: 3
        },
        label: {
          show: true,
          color: isDark
            ? '#e2e8f0'
            : '#334155'
        },
        data: [
          {
            value: props.completed,
            name: '已完成',
            itemStyle: {
              color: '#22c55e'
            }
          },
          {
            value: props.pending,
            name: '待完成',
            itemStyle: {
              color: '#3b82f6'
            }
          },
          {
            value: props.overdue,
            name: '已逾期',
            itemStyle: {
              color: '#ef4444'
            }
          }
        ]
      }
    ]
  })
}

function handleResize(): void {
  chart?.resize()
}

async function initChart(): Promise<void> {
  await nextTick()

  if (!chartElement.value || total.value === 0) {
    return
  }

  chart?.dispose()

  chart = echarts.init(chartElement.value)
  renderChart()
}

onMounted(() => {
  initChart()

  window.addEventListener(
    'resize',
    handleResize
  )
})

watch(
  () => [
    props.completed,
    props.pending,
    props.overdue
  ],
  () => {
    initChart()
  }
)

onUnmounted(() => {
  window.removeEventListener(
    'resize',
    handleResize
  )

  chart?.dispose()
  chart = null
})
</script>