<script>
import { defineComponent, ref } from 'vue';
import { SnippetsOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: { SnippetsOutlined },
    setup() {
        return {
            infos: ref(
                '上传Excel文件,支持输入要读取的key,点击一键生成,可生成表格查看进行查看'
            )
        };
    }
});
</script>

<template>
    <a-typography class="col-box">
        <a-typography-title class="row-box" :level="3"
            ><snippets-outlined />使用说明</a-typography-title
        >
        <a-typography-paragraph>
            <a-typography-text strong>
                {{ infos }}
            </a-typography-text>
        </a-typography-paragraph>
    </a-typography>
</template>
