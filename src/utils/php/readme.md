- 表头：|   key   |  desc  |  model  |  type  | operators | column | relation | group_by_fields | relate_null_to_field|
- 备注：
    * key: 查询标识符 前后端交互时使用
    * desc: 描述
    * model: 查询主体模型类型名称
    * type: 查询支持类型 scope/function/field
    * operators: 查询支持操作集合以|隔开每一个查询操作
    * column: 对应的字段（没有具体字段时使用"-"）当relation字段有时column指向relation里面的字段（当包含sum、count、avg等函数时，分析器会填写is_aggregate=true）
    * relation: 关联模型，没有时使用"-"填充
    * group_by_fields: 分组查询字段，relation填写时分析器会主动填写上relation关联外键作为group字段 没有使用"-"填充
    * relate_null_to_field:在relation用数据时，此项表示not is null 与 is null 操作是判断column还是relation本身是否存在
