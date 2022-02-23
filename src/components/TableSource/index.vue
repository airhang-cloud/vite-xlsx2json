<template>
    <a-table
        class="table-box open-select"
        bordered
        :dataSource="tableReciver.dataSource"
        :columns="tableReciver.columns"
        :pagination="false"
    />
</template>
<script>
import { reactive, watch } from 'vue';
export default {
    name: 'TableSource',
    props: {
        tableOptions: {
            type: Object,
            default: () => {
                return {
                    columns: [],
                    dataSource: []
                };
            }
        }
    },
    setup(props) {
        let tableReciver = reactive({
            columns: [],
            dataSource: []
        });
        watch(
            () => props.tableOptions,
            (val) => {
                tableReciver.columns = val.columns;
                tableReciver.dataSource = val.dataSource;
            },
            {
                immediate: false,
                deep: true
            }
        );
        return {
            tableReciver
        };
    }
};
</script>
