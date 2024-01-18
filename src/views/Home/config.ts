export  const chartTypeConfig:any = {
    'pie':{
        type: 'pie',
        id: 'chart',
        width: '100%',
        height: '100%',
        label: {
            fontSize: 14,
            fontWeight: 600,
            color: "#888",
        },
        labelLine: {
            length: '2%',
            length2: '1%',
        },
        itemStyle: {
            borderRadius: 6,
            shadowColor: '#1677ff7a',
            shadowBlur: 4,
            borderWidth: 0,
        },
        emphasis: {
            itemStyle: {
                color: 'inherit',
                shadowBlur: 10,
                shadowColor: '#1677ff9a'
            },
            label: {
                show: true
            }
        },
    },
    'treemap':{
        type: 'treemap',
        width: '80%',
        height: '80%',
        left: 'center',
        top: 'middle',
        id: 'chart',
        leafDepth: 1,
        nodeClick: false,
        breadcrumb: {
            show: false
        },
        label: {
            fontSize: 14,
            fontWeight: 600,
            color: "#888",
        },
        roam: false,
    }
}

export const colors = [
    '#FF9843',
    '#FFDD95',
    '#86A7FC',
    '#3468C0',

    '#D9EDBF',
    '#FFB996',
    '#FFCF81',
    '#FDFFAB',

    '#80BCBD',
    '#AAD9BB',
    '#D5F0C1',
    '#F9F7C9',

    '#7BD3EA',
    '#A1EEBD',
    '#F6F7C4',
    '#F6D6D6',

    '#FFF78A',
    '#FFE382',
    '#FFC47E',
    '#FFAD84',

    '#7071E8',
    '#C683D7',
    '#ED9ED6',
    '#FFC7C7',

    '#FF8F8F',
    '#EEF296',
    '#9ADE7B',
    '#508D69',

    '#FFC5C5',
    '#FFEBD8',
    '#C7DCA7',
    '#89B9AD',

    '#D0A2F7',

    '#39A7FF',

    '#A2C579',


    // old
    '#a5f1e9',
    '#7fe9de',
    '#80bcbd',
    '#aad9bb',
    '#d5f0c1',
    '#f9f7c9',
    '#756ab6',
    '#ac87c5',
    '#e0aed0',
    '#ffe5e5',
    '#7bd3ea',
    '#ff90bc',
    '#8acdd7',
    '#ffc5c5',
    '#ffebd8',
    '#ff8080',
    '#00a9ff',
    '#89cff3',
    '#a0e9ff',
    '#cdf5fd',
    '#45ffca',
    '#feffac',
    '#ffb6d9',
    '#d67bff',
    '#ffacac',
    '#ffbfa9',
    '#ffebb4',
    '#fbffb1',
    '#b9f3e4',
    '#ea8fea',
    '#ffaacf',
    '#f6e6c2',
    '#cde990',
    '#aacb73',
    '#eac7c7',
    '#f8f988'
]