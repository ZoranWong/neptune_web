import Mock from 'mockjs'
Mock.mock('http://localhost:8888/list.mock','get',{
		'code':0,
		'data':{
			'list|2-5': [{

				// 属性 id 是一个自增数，起始值为 1，每次增 1
				
				'id|+1':1,
				
				'name':'@name',
				
				'time':'@date',
				
				'phone':'number|13',
				
				'roleName':'@cname',
				
				'accountNum':'@integer(60,160)',
				
				'status':1
				
			}]
			
		},
		'message':'操作成功',
		
		'systemDate':new Date().getTime()
	}
);