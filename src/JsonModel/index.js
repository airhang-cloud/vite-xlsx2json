import { CodepenOutlined, BarsOutlined } from '@ant-design/icons-vue';

export const Schema = [
    {
        key: 1,
        tab: { icon: CodepenOutlined, label: '工具' },
        content: [
            {
                com: AboutInfo,
                meta: '关于介绍'
            },
            {
                com: UploadExcel,
                meta: '上传Excel',
                useTem: {
                    slot: 'anyCom',
                    templates: []
                }
            }
        ]
    }
];
