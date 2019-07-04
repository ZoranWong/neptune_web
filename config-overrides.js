const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	//写了下面这个部分，就实现了按需加载，再也不需要再每个页面里面都引入“antd/dist/antd.css”啦
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true  //这里一定要写true，css和less都不行哦
	}),
	addLessLoader({
		javascriptEnabled: true,
		//下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
		modifyVars: {
			"@primary-color": "#4f9863",
			"@link-color": "#4f9863",
			"@text-color":"#666",
			"@disabled-color":"#BDBDBD",
			"@btn-disable-bg": "#F7F7F7",
			"@warning-color":"#FF9C4B",
			"@border-radius-base":"2px",
			"@item-active-bg": "#478759",
			"@item-hover-bg": "#58A86E",
			"@link-hover-color":"#58A86E",
			"@link-active-color": "#478759",
			"@btn-padding-sm": "0 15px",
			"@btn-height-sm": "28px",
			"@btn-font-size-sm":'12px',
			"@table-header-bg":"#58A86E",
			"@table-row-hover-bg":'#F1FCF4',
			"@modal-header-bg":'#444444',
			"@btn-primary-color": "#fff",
			"@btn-default-color": "#4f9863",
			"@btn-default-bg": "#fff",
			"@btn-default-border": "#4f9863",
}
	})
)