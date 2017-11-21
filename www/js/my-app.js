// global vars
var SearchParam = {};
var baInfo = {};
var sblActivity = [{'act_id' : '1-7OW0V2F', 'sbl_status' : 'Done', 'act_name' : 'SWIFT Slotting Request', 'swf_status' : ''},
{'act_id' : '1-7OW0V5Q', 'sbl_status' : 'Done', 'act_name' : 'Verify to Proceed', 'swf_status' : ''},
{'act_id' : '1-7OVZ7IC', 'sbl_status' : 'Scheduled', 'act_name' : 'Slot', 'swf_status' : ''},
{'act_id' : '1-7OVYO3F', 'sbl_status' : 'Done', 'act_name' : 'Installation', 'swf_status' : ''},
{'act_id' : '1-7OW02GA', 'sbl_status' : 'Done', 'act_name' : 'Traveling/On Site', 'swf_status' : ''},
{'act_id' : '1-7OVZVDU', 'sbl_status' : 'Done', 'act_name' : 'Design & Assign', 'swf_status' : ''}
];

var sblActivity_after = [{'act_id' : '1-7OW0V2F', 'sbl_status' : 'Done', 'act_name' : 'SWIFT Slotting Request', 'swf_status' : ''},
{'act_id' : '1-7OW0V5Q', 'sbl_status' : 'Done', 'act_name' : 'Verify to Proceed', 'swf_status' : 'Done'},
{'act_id' : '1-7OVZ7IC', 'sbl_status' : 'Scheduled', 'act_name' : 'Slot', 'swf_status' : ''},
{'act_id' : '1-7OVYO3F', 'sbl_status' : 'Done', 'act_name' : 'Installation', 'swf_status' : 'Done'},
{'act_id' : '1-7OW02GA', 'sbl_status' : 'Done', 'act_name' : 'Traveling/On Site', 'swf_status' : 'Done'},
{'act_id' : '1-7OVZVDU', 'sbl_status' : 'Done', 'act_name' : 'Design & Assign', 'swf_status' : ''}
];
var sblInfos = {};
var swiftInfos = {};
var osmInfos = {};
var eaiActivities = [{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'JMSRequest'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'WSResponse'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'WSRequest'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'WSResponse'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'WSRequest'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'PROV_ORDERING'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'PROD_MAPPING'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'SPLIT_ITEM'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'PREPROCESSOR'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'SVC_PRD_MATCH'},
{'eai_id' : 'EAI000001110321223', 'audit_type' : 'BillingActivate', 'event_name' : 'RQI'}];
var irisInfo = {};
var contentBlock;
var mainURL = 'http://t21php.pub.bweas.tm.com.my/tmnox_php';
var loggedIn = false;
var UsersInfo = {};
var SharedSearch = {};
var isAdmin = true;
var irisContent;

// put all the dataset in here
var SiebelON = '1-16742325973';

var OSM_INFO = {'siebel_order_no' : '1-16742325973',
'osm_id' : '11027922',
'task_mne' : 'Exception_Update_Billing',
'state' : 'Received',
'process' : 'HSBA_Update_Billing_-_Sequential',
'corr_id' : '11027922-27132059791'};

var SIEBEL_INFO  = {'siebel_order_no' : '1-16742325973',
'order_type' : 'New Install', 'acc_name' : 'MAXIS BROADBAND SDN. BHD.', 'order_status' : 'PONR',
'orders' : [
  {'login' : 'VL1026726339', 'product_name' : 'VLAN Voice', 'product_desc' : 'Release 2 Non Consumer Product'},
  {'login' : 'VL1026726340', 'product_name' : 'VLAN Data', 'product_desc' : 'Release 2 Non Consumer Product'},
  {'login' : 'VL1026726341', 'product_name' : 'VLAN Voice', 'product_desc' : 'Release 2 Non Consumer Product'},
  {'login' : 'BU1026726342', 'product_name' : 'BTU Port', 'product_desc' : 'Release 2 Non Consumer Product'}]
};

var SIEBEL_ACTIVITY = {'siebel_order_no' : '1-16742325973',
'activities' : [
  {'activity_num' : '1-7OW0V2F', 'activity_status' : 'Done', 'activity_name' : 'SWIFT Slotting Request', 'activity_created' : '7/7/2017', 'ref' : 'Order HSBA not turn Completed'},
  {'activity_num' : '1-7OW0V5Q', 'activity_status' : 'Done', 'activity_name' : 'Verify to Proceed', 'activity_created' : '7/7/2017', 'ref' : 'Exception Update Billing'},
  {'activity_num' : '1-7OVZ7IC', 'activity_status' : 'Scheduled', 'activity_name' : 'Slot', 'activity_created' : '7/7/2017', 'ref' : ''},
  {'activity_num' : '1-7OVYO3F', 'activity_status' : 'Done', 'activity_name' : 'Installation', 'activity_created' : '7/7/2017', 'ref' : ''},
  {'activity_num' : '1-7OW02GA', 'activity_status' : 'Done', 'activity_name' : 'Traveling/On Site', 'activity_created' : '7/7/2017', 'ref' : ''},
  {'activity_num' : '1-7OVZVDU', 'activity_status' : 'Done', 'activity_name' : 'Design & Assign', 'activity_created' : '7/7/2017', 'ref' : ''}
]};


// Initialize your app
var myApp = new Framework7({
  swipePanel: 'right'
  // , fastclick:  false
});

// Export selectors engine
var $$ = Dom7;

var getJSONabc = function (url, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = function () {

    var status = xhr.status;

    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };

  xhr.send();
};

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar
  dynamicNavbar: true
});

// page inits
myApp.onPageInit('index', function (page) {
  if (!loggedIn) {
    mainView.router.loadPage('login.html');
  }

  hideAdminStuffs();

}).trigger();

myApp.onPageInit('login-screen', function (page) {

  // loggedIn = false;
  // isAdmin = false;
  SharedSearch = {};
  UsersInfo = {};
  SharedSearch.svcsegment = 3;

  myApp.params.swipePanel = false;

  var pageContainer = $$(page.container);
  pageContainer.find('.button').on('click', function () {
    UsersInfo = myApp.formToData('#login-form');
    // Handle username and password
    validateLogin();
    // dummyLogin();
  });
});

function dummyLogin() {
  isAdmin = true;
  loggedIn = true;
  mainView.loadPage("index.html");
}

function validateLogin() {
  var searchURL = mainURL + '/misc/login.php?username=' + UsersInfo.username + "&password=" + UsersInfo.password;
  //  myApp.alert(searchURL);
  isAdmin = true;
  mainView.loadPage("index.html");

  // $.getJSON(searchURL, function (retjson) {
  //   if (retjson.error) {
  //     myApp.alert(retjson.error, "unable to login");
  //   } else {
  //     loggedIn = true;
  //     myApp.params.swipePanel = 'right';

  //     if(retjson.isadmin == 'false'){
  //       isAdmin = false;
  //     } else {
  //       isAdmin = true;
  //     }

  //     mainView.loadPage("index.html");
  //   }

  // })
  //   .fail(function () {
  //     myApp.alert('Unable to connect to ldap', 'Ouch');
  //     return;
  //   });


  // });
}


myApp.onPageInit('app_setting', function (page) {

  var pageContainer = $$(page.container);

  pageContainer.find('#tdefault').on('click', function () {
    document.getElementById("theSuperMainView").className = "views";
  });

  pageContainer.find('#tdark').on('click', function () {
    document.getElementById("theSuperMainView").className = "views layout-dark";
  });

  pageContainer.find('#twhite').on('click', function () {
    document.getElementById("theSuperMainView").className = "views layout-white";
  });

});

myApp.onPageInit('preIrisCreate', function (page) {

  var pageContainer = $$(page.container);


  var irChoices = document.getElementsByClassName('invilist');
  for (var i = 0; i < irChoices.length; i++) {
    irChoices[i].style.display = 'none';
  }

  irChoices = document.getElementsByClassName(SharedSearch.searchFrom);
  for (var i = 0; i < irChoices.length; i++) {
    irChoices[i].style.display = 'block';
  }

  if (SharedSearch.searchFrom == 'searchBA') {
    pageContainer.find('#pci_08').on('click', function () {
      irisContent = {
        'urg': '3'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-BILLING'
        , 'subarea': 'DATA ACCURACY'
        , 'probtype': 'pt17'
      };

      openCreateIris("Current charge not correct");
      
    });

    pageContainer.find('#pci_06').on('click', function () {
      irisContent = {
        'urg': '3'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-BILLING'
        , 'subarea': 'DATA ACCURACY'
        , 'probtype': 'pt16'
      };
      
      openCreateIris("Bill Display not correct");
    });

    pageContainer.find('#pci_07').on('click', function () {
      irisContent = {
        'urg': '3'
        , 'category' : '2'
        , 'impact' : '2'
        , 'area': 'NOVA-ASSURANCE'
        , 'subarea': 'FAILED TO UPDATE'
        , 'probtype': 'pt11'
      };
      
      openCreateIris("pci_07");
    });
  } else if (SharedSearch.searchFrom == 'searchOrder') {
    pageContainer.find('#pci_01').on('click', function () {
      irisContent = {
        'urg': '2'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-FULFILLMENT'
        , 'subarea': 'FAILED TO CREATE'
        , 'probtype': '29'
      };
      
      openCreateIris("Next task not triggered");
    });

    pageContainer.find('#pci_02').on('click', function () {
      irisContent = {
        'urg': '2'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-FULFILLMENT'
        , 'subarea': 'FAILED TO CREATE'
        , 'probtype': '29'
      };
      
      openCreateIris("Order not Completed");
    });

    pageContainer.find('#pci_03').on('click', function () {
      irisContent = {
        'urg': '2'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-FULFILLMENT'
        , 'subarea': 'FAILED TO CREATE'
        , 'probtype': '29'
      };
      
      openCreateIris("Order D&A In Progress");
    });

    pageContainer.find('#pci_04').on('click', function () {
      irisContent = {
        'urg': '2'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-FULFILLMENT'
        , 'subarea': 'FAILED TO CREATE'
        , 'probtype': '29'
      };
      
      openCreateIris("Order not exist in SWIFT Portal");
    });
  } else if (SharedSearch.searchFrom == 'searchCTT') {
    pageContainer.find('#pci_05').on('click', function () {
      irisContent = {
        'urg': '2'
        , 'category' : '2'
        , 'impact' : '4'
        , 'area': 'NOVA-ASSURANCE'
        , 'subarea': 'FAILED TO UPDATE'
        , 'probtype': 'pt10'
      };
      
      openCreateIris("CTT not sync between NOVA and SWIFT");
    });
  } else {
    myApp.alert('Need to search something first', 'NOX');
    mainView.router.loadPage('index.html');
  }

});

myApp.onPageInit('bill_summ', function (page) {
  document.getElementById("billsumpt").innerHTML = "BA#" + SearchParam.banumber;
  baLoadAccInfo("ba_summ_block");
});

myApp.onPageInit('order_osm_detail', function (page) {
  document.getElementById("orderOsmDetailt").innerHTML = "OSM ID#" + osmInfos.osm_id;
  document.getElementById("c_osm_process").innerHTML = osmInfos.osm_process;
  document.getElementById("c_corr_id").innerHTML = osmInfos.corr_id;
  
  
});

myApp.onPageInit('order_eai_page', function (page) {

  var pageContainer = $$(page.container);

  var osmitem = '<div class="swipeout-content item-content">' +
    '<div class="item-inner">' +
    '<div class="item-title-row">' +
    '<div class="item-title">'+OSM_INFO.osm_id+'</div>' +
    '<div class="item-after">'+OSM_INFO.state+'</div>' +
    '</div>' +
    '<div class="item-text">'+OSM_INFO.task_mne+'</div>' +
    '</div>' +
    '</div>' +
    '<div class="swipeout-actions-right">' +
    '<a href="orderctt/order_osm_detail.html" id="osm_show_detail" class="action1 bg-orange">Detail</a>' +
    '<a href="#" class="action2 bg-green">Refire</a>' +
    '</div>';

    document.getElementById("osm_item").innerHTML = osmitem;


    var eaitoappend = "";

    for(eaitem in eaiActivities){
      var eaiitem = ' <li class="swipeout"><div class="swipeout-content item-content">' +
          '<div class="item-inner">' +
          '<div class="item-title-row">' +
          '<div class="item-title">'+eaiActivities[eaitem].eai_id+'</div>' +
          '<div class="item-after">'+eaiActivities[eaitem].audit_type+'</div>' +
          '</div>' +
          '<div class="item-text">'+eaiActivities[eaitem].event_name+'</div>' +
          '</div>' +
          '</div>' +
          '<div class="swipeout-actions-right">' +
          '<a href="#" id="osm_show_detail" class="action1 bg-orange">Detail</a>' +
          '<a href="#" class="action2 bg-green">Fix</a>' +
          '</div></li>';
      eaitoappend = eaitoappend + eaiitem;
    }

    document.getElementById("eai_item").innerHTML = eaitoappend;

});

myApp.onPageInit('order_summ', function (page) {
  hideAdminStuffs();
  document.getElementById("orderSumTopTitle").innerHTML = "Order: " + SiebelON;

  // if (sblInfos.error || !sblInfos) {
  //   myApp.alert('No data fetched', 'NOX');
  //   mainView.router.loadPage('index.html');
  // }

  // set the content for siebel summary
  var o_s_content =
    '<p>Account Name : ' + SIEBEL_INFO.acc_name + '</p>' +
    '<p>Order Type   : ' + SIEBEL_INFO.order_type + '</p>' +
    '<p>Order Status : ' + SIEBEL_INFO.order_status + '</p>';

  // set the content for service list
  var svcounter = 0;
  var o_s_svcs = '<p>Services: <br />';

  for (svcs in SIEBEL_INFO.orders) {
    o_s_svcs = o_s_svcs
      + '    ' + SIEBEL_INFO.orders[svcs].login + ' - ' + SIEBEL_INFO.orders[svcs].product_name + '<br />';

    getServiceSegment(SIEBEL_INFO.orders[svcs].product_desc);
    svcounter = svcounter + 1;
  }

  o_s_svcs = o_s_svcs + "</p>";

  if (svcounter > 0) {
    o_s_content = o_s_content + o_s_svcs;
  }

  document.getElementById("o_s_novainfo").innerHTML = o_s_content;

  // var inSwPortal = "Yes";
  // if(swiftInfos.network_order == 'Pending Processing'){
  //   inSwPortal = "No";
  // }

  var o_sw_content = 
    '<p>In Swift Portal     : Yes</p>' +
    '<p>Installation Status : Done</p>' +
    '<p>Planned Start       : 7/12/2017  2:30:00 PM</p>' +
    '<p>Planned End         : 7/12/2017  5:00:00 PM</p>' +
    '<p>UI ID               : Q000477</p>';

  document.getElementById("o_s_swiftinfo").innerHTML = o_sw_content;
});

function searchOrder2(ref_id) {

  SharedSearch.searchID = ref_id;


  SharedSearch.searchFrom = 'searchOrder';

  mainView.loadPage("orderctt/order_summary.html");

  /*
  // search for the order summary
  var searchURL = mainURL + '/order/o_search.php?orderno=' + SharedSearch.searchID;
  // myApp.alert(searchURL);

  $.getJSON(searchURL, function (retjson) {
    sblInfos = retjson;

    // search for the activities
    searchURL = mainURL + '/order/o_sb_activities.php?orderno=' + SharedSearch.searchID;

    $.getJSON(searchURL, function (retjson) {
      sblActivity = retjson;

      // search for swift
      searchURL = mainURL + '/order/o_sw_summ.php?orderno=' + SharedSearch.searchID;

      $.getJSON(searchURL, function (retjson) {
        swiftInfos = retjson;
        
        // search for osm
        searchURL = mainURL + '/order/o_osm_info.php?orderno=' + SharedSearch.searchID;

        $.getJSON(searchURL, function (retjson) {
          osmInfos = retjson;
          
          if(osmInfos.osm_id){
            // search for eai
            searchURL = mainURL + '/order/o_eai_activity.php?osm_id=' + osmInfos.osm_id;

            $.getJSON(searchURL, function (retjson) {
              eaiActivities = retjson;
              mainView.loadPage("orderctt/order_summary.html");
            })
              .fail(function () {
                myApp.alert('Unable to fetch eai data for ' + SearchParam.ordernumber, 'Ouch');
                return;
              });
          }
          

        })
          .fail(function () {
            myApp.alert('Unable to fetch osm data for ' + SearchParam.ordernumber, 'Ouch');
            return;
          });

      })
        .fail(function () {
          myApp.alert('Unable to fetch swift data for ' + SearchParam.ordernumber, 'Ouch');
          return;
        });

    })
      .fail(function () {
        myApp.alert('Unable to fetch activity data for ' + SearchParam.ordernumber, 'Ouch');
        return;
      });
    
  })
    .fail(function () {
      myApp.alert('Unable to fetch NOVA order data for ' + SearchParam.ordernumber, 'Ouch');
      return;
    });


*/

}

function searchOrder() {
  SearchParam = myApp.formToData('#order-s-form');

  if (SearchParam.ordernumber) {
    SharedSearch.searchID = SearchParam.ordernumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  SharedSearch.searchFrom = 'searchOrder';
  mainView.loadPage("orderctt/order_summary.html");

  /*
  // search for the order summary
  var searchURL = mainURL + '/order/o_search.php?orderno=' + SharedSearch.searchID;
  // myApp.alert(searchURL);

  $.getJSON(searchURL, function (retjson) {
    sblInfos = retjson;

    // search for the activities
    searchURL = mainURL + '/order/o_sb_activities.php?orderno=' + SharedSearch.searchID;

    $.getJSON(searchURL, function (retjson) {
      sblActivity = retjson;

      // search for swift
      searchURL = mainURL + '/order/o_sw_summ.php?orderno=' + SharedSearch.searchID;

      $.getJSON(searchURL, function (retjson) {
        swiftInfos = retjson;
        
        // search for osm
        searchURL = mainURL + '/order/o_osm_info.php?orderno=' + SharedSearch.searchID;

        $.getJSON(searchURL, function (retjson) {
          osmInfos = retjson;
          
          if(osmInfos.osm_id){
            // search for eai
            searchURL = mainURL + '/order/o_eai_activity.php?osm_id=' + osmInfos.osm_id;

            $.getJSON(searchURL, function (retjson) {
              eaiActivities = retjson;
              mainView.loadPage("orderctt/order_summary.html");
            })
              .fail(function () {
                myApp.alert('Unable to fetch eai data for ' + SearchParam.ordernumber, 'Ouch');
                return;
              });
          }
          

        })
          .fail(function () {
            myApp.alert('Unable to fetch osm data for ' + SearchParam.ordernumber, 'Ouch');
            return;
          });

      })
        .fail(function () {
          myApp.alert('Unable to fetch swift data for ' + SearchParam.ordernumber, 'Ouch');
          return;
        });

    })
      .fail(function () {
        myApp.alert('Unable to fetch activity data for ' + SearchParam.ordernumber, 'Ouch');
        return;
      });
    
  })
    .fail(function () {
      myApp.alert('Unable to fetch NOVA order data for ' + SearchParam.ordernumber, 'Ouch');
      return;
    });

    */


}


myApp.onPageInit('order_activities', function (page) {
  document.getElementById("orderActTitle").innerHTML = "Order Activities: " + SearchParam.ordernumber;

  var sblAContent = '<ul><li class="item-content">' +
    '<div class="item-inner">' +
    '<div class="item-title-row">' +
    '<div class="item-title">Activity ID</div>' +
    '<div class="item-after">Swift Status</div>' +
    '<div class="item-after">NOVA Status</div>' +
    '</div>' +
    '<div class="item-text">Activity Name</div>' +
    '</div>' +
    '</li>';

  var itemcount = 0;
  for (act in sblActivity) {
    itemcount = itemcount + 1;
    var sblItem =
      '<li class="item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title-row">' +
      '<div class="item-title">' + sblActivity[act].act_id + '</div>' +
      '<div class="item-after">' + sblActivity[act].swf_status + '</div>' +
      '<div class="item-after">' + sblActivity[act].sbl_status + '</div>' +
      '</div>' +
      '<div class="item-text">' + sblActivity[act].act_name + '</div>' +
      '</div>' +
      '</li>';

    sblAContent = sblAContent + sblItem;
  }

  if (itemcount == 0) {
    var sblItem = '<li class="item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title-row">' +
      '<div class="item-title">No activity found</div>' +
      '</div>' +
      '</div>' +
      '</li>';

    sblAContent = sblAContent + sblItem;
  }

  sblAContent = sblAContent + '</ul>';

  document.getElementById('siebel_item_lst').innerHTML = sblAContent;

  var pageContainer = $$(page.container);
  pageContainer.find('#ci_oep').on('click', function () {
    mainView.loadPage("iris/pre_create_iris.html");
  });

});

myApp.onPageInit('ba_trial_bill', function (page) {
  document.getElementById("trialbillpt").innerHTML = "Trial Bill: " + SearchParam.banumber;
});

myApp.onPageInit('ba_sr_summary', function (page) {
  document.getElementById("basrpt").innerHTML = "SR Summary: " + SearchParam.banumber;
  baLoadAccInfo("sr_summ_block");

  // Pull to refresh content
  var ptrContent = $$(page.container).find('.pull-to-refresh-content');
  // Add 'refresh' listener on it
  ptrContent.on('refresh', function (e) {
    // reload current page
    mainView.router.reloadPage("ba_sr_summary.html");
    myApp.pullToRefreshDone();
  });

});

myApp.onPageInit('ba_h_pymt', function (page) {
  document.getElementById("pymthpt").innerHTML = "Payment History: " + SearchParam.banumber;

  // Pull to refresh content
  var ptrContent = $$(page.container).find('.pull-to-refresh-content');
  // Add 'refresh' listener on it
  ptrContent.on('refresh', function (e) {
    // reload current page
    mainView.router.reloadPage("ba_h_pymt.html");
    myApp.pullToRefreshDone();
  });
});

myApp.onPageInit('create_iris_form', function (page) {
  //document.getElementById("billsumpt").innerHTML = "BA#" + SearchParam.banumber;
  var pageContainer = $$(page.container);

  // $('#area').change(function(){
  //     fillSubareaLOV();
  // });

  // $('#subarea').change(function(){
  //     fillProblemTypeLOV();
  // });

  pageContainer.find('#area').on('change', function () {
    fillSubareaLOV();
  });

  pageContainer.find('#subarea').on('change', function () {
    fillProblemTypeLOV();
  });

  initIrisCreatePage();
});

// search functions

function openCreateIris(irisType) {

  SharedSearch.irisType = irisType;

  mainView.loadPage("iris/iris_create.html");
}

function initIrisCreatePage() {

  document.getElementById("contact").value = UsersInfo.username;
  document.getElementById("notifyby").value = "1";
  document.getElementById("urg").value = irisContent.urg;
  document.getElementById("svcseg").value = SharedSearch.svcsegment;
  document.getElementById("category").value = irisContent.category;
  // document.getElementById("area").value = irisContent.area;
  $('#area').val(irisContent.area);
  fillSubareaLOV();

  // document.getElementById("subarea").value = irisContent.subarea;
  $('#subarea').val(irisContent.subarea);
  fillProblemTypeLOV();
  // document.getElementById("probtype").value = irisContent.probtype;
  $('#probtype').val(irisContent.probtype);

  document.getElementById("ref").value = SharedSearch.searchID;
  document.getElementById("title").value = SharedSearch.searchID + ' - ' + SharedSearch.irisType;
  document.getElementById("desc").innerHTML = SharedSearch.searchID + ' - ' + SharedSearch.irisType;

}


myApp.onPageInit('close_iris_form', function (page) {
  document.getElementById("createIrisTitle").innerHTML = "Close Iris: " + SharedSearch.searchID;

  // Pull to refresh content
  var ptrContent = $$(page.container).find('.pull-to-refresh-content');
  // Add 'refresh' listener on it
  ptrContent.on('refresh', function (e) {
    // reload current page
    mainView.router.reloadPage("iris/iris_close.html");
    myApp.pullToRefreshDone();
  });

  document.getElementById("sdnum").value = irisInfo.interaction_id;
  document.getElementById("status").value = irisInfo.status;
  document.getElementById("contact").value = irisInfo.contact;
  document.getElementById("urg").value = irisInfo.urgency;
  document.getElementById("svcseg").value = irisInfo.service_segment;
  document.getElementById("category").value = irisInfo.category;
  document.getElementById("area").value = irisInfo.area;
  document.getElementById("subarea").value = irisInfo.sub_area;
  document.getElementById("probtype").value = irisInfo.problem_type;
  document.getElementById("ref_id").innerHTML = irisInfo.reference;
  document.getElementById("title").value = irisInfo.title;
  document.getElementById("desc").value = irisInfo.description;

  if(irisInfo.status == 'Closed'){
    document.getElementById("closecode").value = irisInfo.closure_code;
    document.getElementById("closecode").disabled = true;
    document.getElementById("solution").value = irisInfo.solution;
    document.getElementById("closecode").disabled = true;
    document.getElementById("reasoncode").value = irisInfo.reason_code;
    document.getElementById("closecode").disabled = true;
    document.getElementById("remarks").value = irisInfo.remarks;
    document.getElementById("closecode").disabled = true;

    document.getElementById("closebtnir").style.display = 'none';
  }

  var pageContainer = $$(page.container);

  pageContainer.find('#i_c_searchref').on('click', function () {
    searchOrder2(irisInfo.reference);
  });


});

function searchIris() {
  SearchParam = myApp.formToData('#iris-s-form');

  if (SearchParam.irisnumber) {
    SharedSearch.searchID = SearchParam.irisnumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  var searchURL = mainURL + '/iris/i_search.php?sdnum=' + SharedSearch.searchID;

  $.getJSON(searchURL, function (retjson) {
    irisInfo = retjson;
    mainView.loadPage("iris/iris_close.html");
  })
    .fail(function () {
      myApp.alert('Unable to fetch iris data for ' + SearchParam.ordernumber, 'Ouch');
      return;
    });


}

function searchBA() {
  SearchParam = myApp.formToData('#ba-s-form');
  var whatToSearch;

  if (SearchParam.banumber) {
    SharedSearch.searchID = SearchParam.banumber;
    whatToSearch = 'bano';
  } else if (SearchParam.serviceno) {
    SharedSearch.searchID = SearchParam.serviceno;
    whatToSearch = 'svcno';
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  SharedSearch.searchFrom = 'searchBA';
  //  alert(SBA_SearchParam.banumber);

  var baUrl = mainURL + '/brm/get_acc_info.jsp?' + whatToSearch + '='
    + SearchParam.banumber + '&stype=' + whatToSearch;

  //myApp.alert('Searching for ' + SearchParam.banumber, 'Ouch');

  // myApp.alert(baUrl);


  // getJSONabc(baUrl, function (err, data) {

  //   if (err != null) {
  //     myApp.alert('error' + err);
  //   } else {
  //     myApp.alert('data fetched');
      contentBlock =
        '<p>Name      : Britney Spears</p>' +
        '<p>Bill Cycle: 16</p>' +
        '<p>Bill Media: E-Mail</p>' +
        '<p>Address   : 22, Baker Street</p>' +
        '<p>To Email  : iambritney@email.com</p>' +
        '<p>CC Email  : </p>' +
        '<p>Mobile No : 012-callme</p>' +
        '<p>Current Outstanding: 301.45</p>';
      mainView.loadPage("bills/ba_summary.html");
      // mainView.router.loadPage('ba_summary.html');
  //   }
  // });

}


function searchCTT() {
  SearchParam = myApp.formToData('#ctt-s-form');

  if (SearchParam.cttnumber) {
    SharedSearch.searchID = SearchParam.cttnumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  SharedSearch.searchFrom = 'searchCTT';


  mainView.loadPage("order_summary.html");
}



function hideAdminStuffs() {
  if (isAdmin == false) {
    var irChoices = document.getElementsByClassName('adminonly')
    for (var i = 0; i < irChoices.length; i++) {
      irChoices[i].style.display = 'none';
    }
  } else {
    var irChoices = document.getElementsByClassName('adminonly')
    for (var i = 0; i < irChoices.length; i++) {
      irChoices[i].style.display = '';
    }
  }
}

// Billing related functions
function getTrialBill() {
  // SearchParam = myApp.formToData('#order-s-form');
  SearchParam.sType = "searchTB";
  //  alert(SBA_SearchParam.banumber);

  mainView.loadPage("bills/ba_trial_bill.html");
}

function baLoadAccInfo(blockname) {
  document.getElementById(blockname).innerHTML = contentBlock;
}

function cHttpGet(theURL) {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", theURL, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function getServiceSegment(productdesc){
  
  if(productdesc == 'TM HSBB R3 CR Product'){
    SharedSearch.svcsegment = 3;
  } else if(productdesc == 'BIZFEST 2017 : UniFi Biz Advance 30Mbps+ SVP50 (Free 24 months) + Discount RM20 (24 months)'){
    SharedSearch.svcsegment = 3;
  } else if(productdesc == 'TM HSBB R2 Product'){
    SharedSearch.svcsegment = 3;
  } else if(productdesc == 'Transmission Network'){
    SharedSearch.svcsegment = 5;
  } else if(productdesc == 'Transmission Tail Leg'){
    SharedSearch.svcsegment = 5;
  } else if(productdesc == 'Termination Point - Leased Line'){
    SharedSearch.svcsegment = 5;
  } else if(productdesc == 'Transmission Trunk'){
    SharedSearch.svcsegment = 5;
  } else if(productdesc == 'UniFi Biz Pro 100Mbps (TM Internal)'){
    SharedSearch.svcsegment = 1;
  } else if(productdesc == 'Release 2 Non Consumer Product'){
    SharedSearch.svcsegment = 2;
  } else if(productdesc == 'BIZFEST 2017 : UniFi Biz Pro 100Mbps + SVP70 (Free 24 months) + Discount RM20 (24 months)'){
    SharedSearch.svcsegment = 3;
  } else if(productdesc == 'Release 3.1 Non Consumer Product'){
    SharedSearch.svcsegment = 4;
  } else if(productdesc == 'UniFi Lite 10Mbps + Jumbo Lite Pack + Voice STD 20 + Free HyppTV Everywhere'){
    SharedSearch.svcsegment = 3;
  } else if(productdesc == 'UniFi Lite 10Mbps + Aneka Pack + Free HyppTV Everywhere'){
    SharedSearch.svcsegment = 3;
  } 

}

function createIris() {
  var irisForm = myApp.formToData('#c-iris-form');

  var updateurl = mainURL + "/iris/i_create.php?contact=" + irisForm.contact 
          + "&notifyby=" + irisForm.notifyby 
          + "&urg=" + irisForm.urg
          + "&impact="  + irisForm.impact 
          + "&svcseg=" + irisForm.svcseg
          + "&category=" + irisForm.category
          + "&area=" + irisForm.area
          + "&subarea=" + irisForm.subarea
          + "&probtype=" + irisForm.probtype
          + "&ref=" + irisForm.ref
          + "&title=" + irisForm.title
          + "&desc=" + irisForm.desc ;

  $.getJSON(updateurl, function (retjson) {
    if (retjson.error) {
      myApp.alert(retjson.error, "unable to create iris");
    } else {

      myApp.alert("" + retjson.sdnum, "Iris Created");
      
      mainView.loadPage("index.html");
    }

  })
    .fail(function () {
      myApp.alert('Unable to connect to server', 'Ouch');
      return;
    });


}

function closeIris(){
  var irisForm = myApp.formToData('#close-iris-form');

  var updateurl = mainURL + "/iris/i_create.php?sdnum=" + irisForm.sdnum 
          + "&closecode=" + irisForm.closecode 
          + "&solution=" + irisForm.solution
          + "&reasoncode="  + irisForm.reasoncode 
          + "&remark=" + irisForm.remarks



  $.getJSON(updateurl, function (retjson) {
    if (retjson.error) {
      myApp.alert(retjson.error, "unable to close iris");
    } else {
      myApp.alert("" + irisForm.sdnum, "Iris Closed");

      mainView.loadPage("index.html");
    }

  })
    .fail(function () {
      myApp.alert('Unable to connect to ldap', 'Ouch');
      return;
    });




}

function fillSubareaLOV() {
  var theoptions = '';
  var theArea = document.getElementById("area");
  var areacode = theArea.options[theArea.selectedIndex].value;

  if (areacode == "NOVA-ASSURANCE") {
    theoptions = '<option value="FAILED TO CREATE">FAILED TO CREATE</option>'
      + '<option value="FAILED TO GENERATE">FAILED TO GENERATE</option>'
      + '<option value="FAILED TO UPDATE">FAILED TO UPDATE</option>'
      + '<option value="SR ADJUSTMENT">SR ADJUSTMENT</option>';

  } else if (areacode == "NOVA-BILLING") {
    theoptions = '<option value="DATA ACCURACY">DATA ACCURACY</option>'
      + '<option value="FAILED TO GENERATE">FAILED TO GENERATE</option>'
      + '<option value="FAILED TO VIEW">FAILED TO VIEW</option>';

  } else if (areacode == "NOVA-FULFILLMENT") {
    theoptions = '<option value="FAILED TO ACTIVATE">FAILED TO ACTIVATE</option>'
      + '<option value="FAILED TO CREATE">FAILED TO CREATE</option>'
      + '<option value="FAILED TO GENERATE">FAILED TO GENERATE</option>'
      + '<option value="FAILED TO UPDATE">FAILED TO UPDATE</option>';
  }

  document.getElementById("subarea").innerHTML = theoptions;

  fillProblemTypeLOV();

}

function fillProblemTypeLOV() {
  var theoptions = '';
  var theArea = document.getElementById("area");
  var areacode = theArea.options[theArea.selectedIndex].value;

  var theSubArea = document.getElementById("subarea");
  var subareacode = theSubArea.options[theSubArea.selectedIndex].value;

  if (areacode == "NOVA-ASSURANCE") {
    if (subareacode == "FAILED TO CREATE") {
      theoptions = '<option value="pt01">UNABLE TO ASSIGN/REASSIGN CTT /SR OWNER &amp; ACTIVITY</option>'
        + '<option value="pt02">UNABLE TO CREATE NOTES</option>'
        + '<option value="pt03">UNABLE TO CREATE SR/TT</option>'
        + '<option value="pt04">UNABLE TO SUBMIT SR/TT</option>';

    } else if (subareacode == "FAILED TO GENERATE") {
      theoptions = '<option value="pt05">NEW PWORD NOT RESET/RECEIVE FOR COMPLETE/CLOSE SR</option>'
        + '<option value="pt06">UNABLE TO SUBMIT ADJUSTMENT REQUEST (AR)</option>'
        + '<option value="pt07">UNABLE TO GENERATE SR/TT LIST</option>'
        + '<option value="pt08">UNABLE TO RESET/RECEIVE PASSWORD</option>';

    } else if (subareacode == "FAILED TO UPDATE") {
      theoptions = '<option value="pt09">UNABLE TO ASSIGN/REASSIGN CTT /SR OWNER & ACTIVITY</option>'
        + '<option value="pt10">UNABLE TO CLOSE/COMPLETE SR/CTT</option>'
        + '<option value="pt11">UNABLE TO UPDATE NOTES</option>'
        + '<option value="pt12">UNABLE TO UPDATE NTT</option>';

    } else if (subareacode == "SR ADJUSTMENT") {
      theoptions = '<option value="pt13">ADJUSTMENT STATUS</option>'
        + '<option value="pt14">UNABLE TO CREATE ADJUSTMENT</option>'
        + '<option value="pt15">UNABLE TO SUBMIT ADJUSTMENT</option>';

    }

  } else if (areacode == "NOVA-BILLING") {
    if (subareacode == "DATA ACCURACY") {
      theoptions = '<option value="pt16">INACCURATE BILL DISPLAY</option>'
        + '<option value="pt17">INACCURATE CHARGES</option>';

    } else if (subareacode == "FAILED TO GENERATE") {
      theoptions = '<option value="pt18">BILL NOT GENERATED</option>'
        + '<option value="pt19">UNABLE TO SEND EMAIL BILL TO CUSTOMER</option>';

    } else if (subareacode == "FAILED TO VIEW") {
      theoptions = '<option value="20">UNABLE TO VIEW BILL</option>';

    }

  } else if (areacode == "NOVA-FULFILLMENT") {
    if (subareacode == "FAILED TO ACTIVATE") {
      theoptions = '<option value="21">ACTIVITY NOT APPEAR/DISPLAY</option>'
        + '<option value="22">D&mp;A IN PROGRESS (HIS/IPTV/VOBB)</option>'
        + '<option value="23">INCOMPLETE CONFIGURATION</option>'
        + '<option value="24">INCOMPLETE/WRONG ORDER STATUS (SUBMIT/PONR ETC)</option>'
        + '<option value="25">INCORRECT ACTIVITY APPEARED/DISPLAYED</option>'
        + '<option value="26">INTERFACE OR PORT ALREADY BE USED BY OTHER SERVICE</option>'
        + '<option value="27">INVALID IP ADDRESS ON NODE</option>'
        + '<option value="28">TIMEOUT ISSUES</option>';

    } else if (subareacode == "FAILED TO CREATE") {
      theoptions = '<option value="29">FAILED TO CREATE</option>';

    } else if (subareacode == "FAILED TO GENERATE") {
      theoptions = '<option value="30">CONFIGURATION STILL NOT SUPPORTED BY SYSTEM</option>'
        + '<option value="31">DATA BETWEEN EMS AND SYSTEM WAS NOT SYNCHRONIZE</option>'
        + '<option value="32">EMS COMPENTANCY – FAIL TO CONNECT TO EMS</option>'
        + '<option value="33">EMS COMPENTANCY – FAIL TO CONNECT TO EMS (MAINTANC</option>'
        + '<option value="34">EMS UPGRADE – CONFIGURATION HAS CHANGE</option>'
        + '<option value="35">EMS UPGRADE – CONFIGURATION HAS CHANGE WITH PREVIO</option>'
        + '<option value="36">IP NOT AVAILABLE</option>'
        + '<option value="37">LICENSE ISSUE</option>'
        + '<option value="38">QUERY NETWORK ISSUE</option>'
        + '<option value="39">VOBB NOT AVAILABLE</option>';

    } else if (subareacode == "FAILED TO UPDATE") {
      theoptions = '<option value="40">CARD TAGGING (VDSL)</option>'
        + '<option value="41">IPTV FORCE DONE</option>'
        + '<option value="42">PORT FULL (FTTH/VDSL)</option>'
        + '<option value="43">PORT MISMATCH</option>'
        + '<option value="44">PORT NOT AVAILABLE (FTTH/VDSL)</option>'
        + '<option value="45">UNABLE TO AUTO TERMINATE UPDATE</option>'
        + '<option value="46">UNABLE TO CANCEL ORDER (PONR)</option>'
        + '<option value="47">UNABLE TO FIND DATA IN SYSTEM</option>'
        + '<option value="48">UNABLE TO RESERVE PORT</option>'
        + '<option value="49">UNABLE TO UPDATE ACTIVITY STATUS</option>'
        + '<option value="50">UNABLE TO UPDATE NOTES</option>'
        + '<option value="51">UNABLE TO UPDATE STATUS FOR PATH OR RESOURCES</option>';

    }
  }

  document.getElementById("probtype").innerHTML = theoptions;

}


