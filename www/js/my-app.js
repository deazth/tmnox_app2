// global vars
var SearchParam = {};
var baInfo = {};
var sblActivity = {};
var sblInfos = {};
var swiftInfos = {};
var osmInfos = {};
var contentBlock;
var mainURL = 'http://t21php.pub.bweas.tm.com.my/tmnox_php';
var loggedIn = false;
var UsersInfo = {};
var SharedSearch = {};
var isAdmin;

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

  loggedIn = false;
  isAdmin = false;
  SharedSearch = {};
  UsersInfo = {};

  myApp.params.swipePanel = false;

  var pageContainer = $$(page.container);
  pageContainer.find('.button').on('click', function () {
    UsersInfo = myApp.formToData('#login-form');
    // Handle username and password
    // validateLogin();
    dummyLogin();
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

  $.getJSON(searchURL, function (retjson) {
    if (retjson.error) {
      myApp.alert(retjson.error, "unable to login");
    } else {
      loggedIn = true;
      myApp.params.swipePanel = 'right';

      isAdmin = retjson.isadmin;

      mainView.loadPage("index.html");
    }

  })
    .fail(function () {
      myApp.alert('Unable to connect to ldap', 'Ouch');
      return;
    });


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

  var irChoices = document.getElementsByClassName(SharedSearch.searchFrom)
  for (var i = 0; i < irChoices.length; i++) {
    irChoices[i].innerHTML = SharedSearch.searchID;
  }

  if (SharedSearch.searchFrom == 'searchBA') {
    pageContainer.find('#pci_08').on('click', function () {
      openCreateIris("Current charge not correct");
    });

    pageContainer.find('#pci_06').on('click', function () {
      openCreateIris("Bill Display not correct");
    });

    pageContainer.find('#pci_07').on('click', function () {
      openCreateIris("pci_07");
    });
  } else if (SharedSearch.searchFrom == 'searchOrder') {
    pageContainer.find('#pci_01').on('click', function () {
      openCreateIris("Next task not triggered");
    });

    pageContainer.find('#pci_02').on('click', function () {
      openCreateIris("Order not Completed");
    });

    pageContainer.find('#pci_03').on('click', function () {
      openCreateIris("Order D&A In Progress");
    });

    pageContainer.find('#pci_04').on('click', function () {
      openCreateIris("Order not exist in SWIFT Portal");
    });
  } else if (SharedSearch.searchFrom == 'searchCTT') {
    pageContainer.find('#pci_05').on('click', function () {
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

myApp.onPageInit('order_eai_page', function (page) {
  var osmitem = '<div class="swipeout-content item-content">' +
    '<div class="item-inner">' +
    '<div class="item-title-row">' +
    '<div class="item-title">'+osmInfos.osm_id+'</div>' +
    '<div class="item-after">'+osmInfos.osm_status+'</div>' +
    '</div>' +
    '<div class="item-text">'+osmInfos.task_mne+'</div>' +
    '</div>' +
    '</div>' +
    '<div class="swipeout-actions-right">' +
    '<a href="#" class="action1 bg-orange">Detail</a>' +
    '<a href="#" class="action2 bg-green">Fix</a>' +
    '</div>';

    document.getElementById("osm_item").innerHTML = osmitem;
    
});

myApp.onPageInit('order_summ', function (page) {
  hideAdminStuffs();
  document.getElementById("orderSumTopTitle").innerHTML = "Order: " + SearchParam.ordernumber;

  if (sblInfos.error || !sblInfos) {
    myApp.alert('No data fetched', 'NOX');
    mainView.router.loadPage('index.html');
  }

  // set the content for siebel summary
  var o_s_content =
    '<p>Account Name : ' + sblInfos.acc_name + '</p>' +
    '<p>Bill Cycle   : ' + sblInfos.order_type + '</p>' +
    '<p>Bill Media   : ' + sblInfos.order_status + '</p>';

  // set the content for service list
  var svcounter = 0;
  var o_s_svcs = '<p>Services: <br />';

  for (svcs in sblInfos.services) {
    o_s_svcs = o_s_svcs
      + '    ' + sblInfos.services[svcs].svc_id + ' - ' + sblInfos.services[svcs].product_name + '<br />';
    svcounter = svcounter + 1;
  }

  o_s_svcs = o_s_svcs + "</p>";

  if (svcounter > 0) {
    o_s_content = o_s_content + o_s_svcs;
  }

  document.getElementById("o_s_novainfo").innerHTML = o_s_content;

});

function searchOrder() {
  SearchParam = myApp.formToData('#order-s-form');

  if (SearchParam.ordernumber) {
    SharedSearch.searchID = SearchParam.ordernumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  SharedSearch.searchFrom = 'searchOrder';

  // search for the order summary
  var searchURL = mainURL + '/order/o_search.php?orderno=' + SharedSearch.searchID;
  myApp.alert(searchURL);

  $.getJSON(searchURL, function (retjson) {
    sblInfos = retjson;

    // search for the activities
    searchURL = mainURL + '/order/o_sb_activities.php?orderno=' + SharedSearch.searchID;

    $.getJSON(searchURL, function (retjson) {
      sblActivity = retjson;
      mainView.loadPage("orderctt/order_summary.html");
    })
      .fail(function () {
        myApp.alert('Unable to fetch data for ' + SearchParam.ordernumber, 'Ouch');
        return;
      });

  })
    .fail(function () {
      myApp.alert('Unable to fetch data for ' + SearchParam.ordernumber, 'Ouch');
      return;
    });




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

  mainView.loadPage("iris_create.html");
}

function initIrisCreatePage() {

  var irisContent = {
    'urg': '3'
    , 'svc': 'NOVA'
    , 'svcseg': '5'
    , 'area': 'NOVA-ASSURANCE'
    , 'subarea': 'FAILED TO UPDATE'
    , 'probtype': 'pt11'
    , 'ref': SharedSearch.searchID
    , 'title': SharedSearch.searchID + ' - ' + SharedSearch.irisType
    , 'desc': SharedSearch.searchID + ' - ' + 'some random masalah'
  };

  document.getElementById("contact").value = UsersInfo.username;
  document.getElementById("notifyby").value = "1";
  document.getElementById("urg").value = irisContent.urg;
  document.getElementById("svc").value = irisContent.svc;
  document.getElementById("svcseg").value = irisContent.svcseg;
  // document.getElementById("area").value = irisContent.area;
  $('#area').val(irisContent.area);
  fillSubareaLOV();

  // document.getElementById("subarea").value = irisContent.subarea;
  $('#subarea').val(irisContent.subarea);
  fillProblemTypeLOV();
  // document.getElementById("probtype").value = irisContent.probtype;
  $('#probtype').val(irisContent.probtype);

  document.getElementById("ref").value = irisContent.ref;
  document.getElementById("title").value = irisContent.title;
  document.getElementById("desc").innerHTML = irisContent.desc;

}

function searchIris() {
  SearchParam = myApp.formToData('#iris-s-form');

  if (SearchParam.irisnumber) {
    SharedSearch.searchID = SearchParam.irisnumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }
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


  getJSONabc(baUrl, function (err, data) {

    if (err != null) {
      myApp.alert('error' + err);
    } else {
      myApp.alert('data fetched');
      contentBlock =
        '<p>Name: ' + data.name + '</p>' +
        '<p>Bill Cycle: ' + data.bp + '</p>' +
        '<p>Bill Media: ' + data.billmedia + '</p>' +
        '<p>Address: ' + data.address + '</p>' +
        '<p>To Email: ' + data.toemail + '</p>' +
        '<p>CC Email: ' + data.ccemail + '</p>' +
        '<p>Mobile No: ' + data.mobileno + '</p>' +
        '<p>Current Outstanding: ' + data.outstanding + '</p>';
      mainView.loadPage("bills/ba_summary.html");
      // mainView.router.loadPage('ba_summary.html');
    }
  });

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
  SearchParam = myApp.formToData('#order-s-form');
  SearchParam.sType = "searchOrder";
  //  alert(SBA_SearchParam.banumber);

  mainView.loadPage("order_summary.html");
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

function createIris() {
  var irisForm = myApp.formToData('#c-iris-form');



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


