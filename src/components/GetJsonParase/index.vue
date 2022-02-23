<template>
    <div class="row-box center scroll-box">
        <a-card
            v-for="(el, idx) in recordsHis"
            :key="el"
            hoverable
            :title="`记录${idx + 1}`"
            style="width: 300px; height: 200px; margin: 6px;"
        >
            <p>{{ el.file }}</p>
        </a-card>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'GetJsonParase',
    props: {
        records: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    setup(props) {
        let recordsHis = ref();
        watch(
            () => props.records,
            (val) => {
                recordsHis.value = val;
            },
            {
                immediate: true
            }
        );

        return {
            msg: ref('测试'),
            recordsHis
        };
    }
});
</script>

<style></style>
