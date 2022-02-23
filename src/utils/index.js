/**
 * @description: 导入数据 2 表格列和表格数据
 * @author: airhang
 * */
export const paraseExcel2Json = (excel) => {
    let columns = Object.keys(excel).map((el) => {
        return {
            title: el.split('-')[1],
            dataIndex: el.split('-')[0],
            key: el.split('-')[0]
        };
    });
    console.log('lie12', columns);
    return Object.assign({}, { columns, dataSource: jsonExcel });
};

/**
 * @description: window窗口缓存 ----- 导入记录记载 ------ 相当粗糙 有待提高
 * @author: airhang
 * */

export const setImportHistory = (file) => {
    let history = JSON.parse(sessionStorage.getItem('importhistory'));
    if (Array.isArray(history)) {
        if (history.length) {
            history.push(file);
            sessionStorage.setItem('importhistory', JSON.stringify(history));
        }
    } else
        sessionStorage.setItem(
            'importhistory',
            JSON.stringify(new Array(file))
        );
};
export const getImportHistory = (file) => {
    return JSON.parse(sessionStorage.getItem('importhistory'));
};
