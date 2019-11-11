import Mock from 'mockjs'

Mock.setup({
  timeout: 500
})
// 登陆请求
Mock.mock('/login', 'post', Options => {
  if (Options.body === 'username=admin&password=123456') {
    return {
      'data': {
        token: 'qwertyuiop'
      },
      'meta': {
        msg: '登陆成功',
        status: 200
      }
    }
  } else {
    return {
      'meta': {
        msg: '等登失败',
        status: 404
      }
    }
  }
})

// 左侧列表请求
Mock.mock('/menulist', 'get', Options => {
  return {
    'data': [{
      'id': 101,
      'title': '首页',
      'path': 'home',
      'children': [
        {
          'id': 110,
          'title': '预开票',
          'path': 'beforehand',
          'children': []
        },
        {
          'id': 111,
          'title': '制品单',
          'path': 'product',
          'children': []
        },
        {
          'id': 112,
          'title': '设备单',
          'path': 'equipment',
          'children': []
        }
      ]
    },
    {
      'id': 102,
      'title': '新建',
      'path': '新建',
      'children': [{
        'id': 103,
        'title': '新建制品单',
        'path': 'newproduct',
        'children': []
      },
      {
        'id': 104,
        'title': '新建设备单',
        'path': 'newequipment',
        'children': []
      },
      {
        'id': 105,
        'title': '新建关联单',
        'path': 'linkitem',
        'children': []
      }
      ]
    },
    {
      'id': 106,
      'title': '确认',
      'path': 'confirm',
      'children': []
    },
    {
      'id': 107,
      'title': '查询',
      'path': 'query',
      'children': []
    },
    {
      'id': 108,
      'title': '高级查询',
      'path': 'highquery',
      'children': [{
        'id': 109,
        'title': '制品分析',
        'path': 'proanalysis',
        'children': []
      },
      {
        'id': 102,
        'title': '设备分析',
        'path': 'equanalysis',
        'children': []
      }

      ]
    }
    ],
    'mate': {
      status: 200
    }
  }
})

export default Mock
