<template>
    <div class="row-box">
        <a-upload
            v-model:file-list="fileList"
            :multiple="uploadConfig.multiple"
            :action="uploadConfig.action"
            :headers="uploadConfig.headers"
            :showUploadList="uploadConfig.showUploadList"
            :accept="uploadConfig.accept"
            :customRequest="handleRequest"
        >
            <a-button>
                <component :is="uploadConfig.icon" />
                {{ uploadConfig.label }}
            </a-button>
        </a-upload>
        <slot name="anyCom"></slot>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { read, utils } from 'xlsx';
import { setImportHistory } from '../../utils/index';

const emit = defineEmits(['SendJsonExcel']);
let fileList = reactive([]);
const uploadConfig = reactive({
    headers: { authorization: 'authorization-user-token' },
    action: '/',
    multiple: false,
    label: '上传Excel文件',
    icon: UploadOutlined,
    accept: '.xlsx',
    showUploadList: false
});

const handleRequest = (file) => {
    console.log('f', file);
    setImportHistory({ file: file.file.name });
    readXLSX(file.file)
        .then((res) => {
            emit('SendJsonExcel', { isOk: true, jsonExcel: res });
        })
        .catch((err) => {
            emit('SendJsonExcel', { isOk: false });
        });
};

const readXLSX = (file) => {
    let nameSplit = file.name.split('.');
    let format = nameSplit[nameSplit.length - 1];
    if (!['xlsx', 'csv'].includes(format)) {
        return false;
    }
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (evt) {
            let data = evt.target.result; // 读到的数据
            try {
                var workbook = read(data, { type: 'binary' });
                const wsname = workbook.SheetNames[0]; //这里取第一张表,您可以自行调整,亦可以采取便利再操作
                const ws = utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
                resolve(ws);
            } catch (err) {
                reject('some wrong with import');
            }
        };
    });
};
</script>
