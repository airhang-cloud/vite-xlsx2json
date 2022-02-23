<template>
    <a-tabs v-model:activeKey="activeKey" @change="handleTab" centered>
        <a-tab-pane key="1">
            <template #tab>
                <span>
                    <codepen-outlined />
                    工具
                </span>
            </template>
            <div class="scroll-box">
                <AboutInfo />
                <UploadExcel @SendJsonExcel="handleJson">
                    <template v-slot:anyCom>
                        <a-input
                            v-model:value="config.key"
                            style="width: 200px;"
                            placeholder="填写key"
                        />
                        <a-button @click="handleSearch(1)">点击生成</a-button>
                        <a-button @click="handleSearch(2)">重置</a-button>
                    </template>
                </UploadExcel>
                <TableSource :tableOptions="test" />
            </div>
        </a-tab-pane>
        <a-tab-pane key="2">
            <template #tab>
                <span>
                    <bars-outlined />
                    记录
                </span>
            </template>
            <GetJsonParase :records="records" />
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import { CodepenOutlined, BarsOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import UploadExcel from './components/UploadExcel/index.vue';
import GetJsonParase from './components/GetJsonParase/index.vue';
import AboutInfo from './components/AboutInfo/index.vue';
import TableSource from './components/TableSource/index.vue';
import { XLSXEMIT } from './eventBus';
import { getImportHistory } from './utils/index';
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
    components: {
        CodepenOutlined,
        BarsOutlined,
        UploadExcel,
        TableSource,
        GetJsonParase,
        AboutInfo
    },
    setup() {
        const test = reactive({
            columns: [1, 2],
            dataSource: [6, 6, 6]
        });
        const resultJson = ref();
        const records = ref();
        let config = reactive({
            key: ''
        });
        // 接参 ----- 不够便捷 ----- 插眼优化
        const handleJson = (val) => {
            const { isOk, jsonExcel } = val;
            if (isOk) {
                let columns = Object.keys(jsonExcel[0]).map((el) => {
                    return {
                        title: el,
                        dataIndex: el,
                        key: el
                    };
                });
                let trigerJson = jsonExcel.map((el, idx) => {
                    return Object.assign(el, { key: idx + '' });
                });
                test.dataSource = trigerJson;
                test.columns = columns;
                resultJson.value = JSON.parse(JSON.stringify(test));
            } else message.error('This is an error message');
        };
        // 搜索赋值 ----- 赋值不够优美 ----- 拆眼优化
        const handleSearch = (val) => {
            try {
                if (val === 1 && config.key.length) {
                    let a = resultJson.value.columns.filter((el) => {
                        return el.key === config.key;
                    });
                    let b = resultJson.value.dataSource.map((el, idx) => {
                        return {
                            key: idx + '',
                            [config.key]: el[config.key]
                        };
                    });
                    test.dataSource = b;
                    test.columns = a;
                } else {
                    test.dataSource = resultJson.value.dataSource;
                    test.columns = resultJson.value.columns;
                    config.key = '';
                }
            } catch (err) {
                // console.log(err);
                message.error(
                    '请先按照模板提供的excel,填完导入后再进行事件操作'
                );
            }
        };
        // tab toggle
        const handleTab = (val) => {
            if (Number(val) === 2) {
                records.value = getImportHistory();
            }
        };
        return {
            activeKey: ref('1'),
            handleJson,
            records,
            test,
            config,
            handleSearch,
            handleTab
        };
    }
});
</script>
<style>
@import url('./style/index');
.center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
.row-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.col-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.ant-tabs-nav .ant-tabs-tab:hover {
    color: #000 !important;
}
.ant-tabs-nav .ant-tabs-tab-active {
    color: #000 !important;
}
.ant-tabs-ink-bar {
    background-color: #000 !important;
}
.table-box {
    max-width: 750px;
    margin: 16px auto;
}
.scroll-box {
    overflow-y: scroll;
    height: 90vh;
}
</style>
