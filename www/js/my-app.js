// global vars
var SearchParam = {};
var baInfo = {};
var sblActivity = {};
var swiftActivity = {}; 
var contentBlock;
var mainURL = 'http://localhost:8080/NoxMW';
var loggedIn = false;
var UsersInfo = {};
var SharedSearch = {};

var irisLOVMappings = {
  "NOVA-ASSURANCE" : {
    "area" : "NOVA-ASSURANCE",
    "subarea" : {

    }
  },
  "NOVA-BILLING" : {
    "area" : "NOVA-BILLING"
  },
  "NOVA-FULFILLMENT" : {
    "area" : "NOVA-FULFILLMENT"
  }
  
};

// Initialize your app
var myApp = new Framework7({
  swipePanel: 'right'
});

// Export selectors engine
var $$ = Dom7;

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
  }).trigger(); 

  myApp.onPageInit('login-screen', function (page) {

    loggedIn = false;

    myApp.params.swipePanel = false;

    var pageContainer = $$(page.container);
    pageContainer.find('.button').on('click', function () {
      UsersInfo = myApp.formToData('#login-form');
      // Handle username and password
      validateLogin();

    });
  }); 

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
    for (var i=0; i < irChoices.length; i++) {
        irChoices[i].innerHTML = SharedSearch.searchID;
    }

    // check for search order history
    if(SharedSearch.searchFrom == 'searchBA'){
      pageContainer.find('#pci_08').on('click', function () {
        openCreateIris("pci_08");
      });

      pageContainer.find('#pci_06').on('click', function () {
        openCreateIris("pci_06");
      });

      pageContainer.find('#pci_07').on('click', function () {
        openCreateIris("pci_07");
      });
    } else if(SharedSearch.searchFrom == 'searchOrder'){
      pageContainer.find('#pci_01').on('click', function () {
        openCreateIris("pci_01");
      });

      pageContainer.find('#pci_02').on('click', function () {
        openCreateIris("pci_02");
      });

      pageContainer.find('#pci_03').on('click', function () {
        openCreateIris("pci_03");
      });

      pageContainer.find('#pci_04').on('click', function () {
        openCreateIris("pci_04");
      });
    } else if(SharedSearch.searchFrom == 'searchCTT'){
      pageContainer.find('#pci_05').on('click', function () {
        openCreateIris("pci_05");
      });
    } else {
      myApp.alert('Need to search something first', 'NOX');
      mainView.router.loadPage('index.html');
    }
    
  });

  myApp.onPageInit('bill_summ', function (page) {
    myApp.alert('init bill sum called');
    document.getElementById("billsumpt").innerHTML = "BA#" + SearchParam.banumber;
    baLoadAccInfo("ba_summ_block");
  });  

  myApp.onPageInit('order_summ', function (page) {
    document.getElementById("orderSumTopTitle").innerHTML = "Order: " + SearchParam.ordernumber;
  });

  myApp.onPageInit('order_activities', function (page) {
    document.getElementById("orderActTitle").innerHTML = "Order Activities: " + SearchParam.ordernumber;
    soLoadSiebelActivity(sblActivity, "siebel_item_lst");
    soLoadSiebelActivity(swiftActivity, "swift_item_lst");
  });

  myApp.onPageInit('ba_trial_bill', function (page){
    document.getElementById("trialbillpt").innerHTML = "Trial Bill: " + SearchParam.banumber;
  });

  myApp.onPageInit('ba_sr_summary', function (page){
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

  myApp.onPageInit('ba_h_pymt', function (page){
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
    initIrisCreatePage();
  });

// search functions

function openCreateIris(irisType){

  SharedSearch.irisType = irisType;

  mainView.loadPage("create_iris.html");
}

function initIrisCreatePage(){

  
  var irisContent = {
      'urg' : 'Medium'
    , 'svc' : 'NOVA'
    , 'svcseg' : 'mm'
    , 'area' : 'kl'
    , 'subarea' : 'paloh hinai'
    , 'probtype' : 'qos'
    , 'ref' : SharedSearch.searchID
    , 'title' : SharedSearch.irisType
    , 'desc' : 'some random masalah'
  };

  document.getElementById("urg").value = irisContent.urg;
  document.getElementById("svc").value = irisContent.svc;
  document.getElementById("svcseg").value = irisContent.svcseg;
  document.getElementById("area").value = irisContent.area;
  document.getElementById("subarea").value = irisContent.subarea;
  document.getElementById("probtype").value = irisContent.probtype;
  document.getElementById("ref").value = irisContent.ref;
  document.getElementById("title").value = irisContent.title;
  document.getElementById("desc").innerHTML = irisContent.desc;

}

function searchBA(){
  SearchParam = myApp.formToData('#ba-s-form');
  var whatToSearch;

  if(SearchParam.banumber){
    SharedSearch.searchID = SearchParam.banumber;
    whatToSearch = 'bano';
  } else if(SearchParam.serviceno){
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


  /*
  $.getJSON(baUrl, function(baInfo){
  
    contentBlock = 
        '<p>Name: ' + baInfo.name + '</p>' +
        '<p>Bill Cycle: ' + baInfo.bp + '</p>' +
        '<p>Bill Media: ' + baInfo.billmedia + '</p>' +
        '<p>Address: ' + baInfo.address + '</p>' +
        '<p>To Email: ' + baInfo.toemail + '</p>' +
        '<p>CC Email: ' + baInfo.ccemail + '</p>' +
        '<p>Mobile No: ' + baInfo.mobileno + '</p>' +
        '<p>Current Outstanding: ' + baInfo.outstanding + '</p>';
        mainView.loadPage("ba_summary.html");
        
        myApp.alert('Data fetcged ' + SearchParam.banumber, 'Ouch');
  })
    .fail(function(){
      myApp.alert('Unable to fetch data for ' + SearchParam.banumber, 'Ouch');
    });

    */

  //get the BA info
  baInfo = {
    'name':'Siti Pelanggan Binti Abahnye',
    'mobileno':'019-3652001',
    'billmedia':'0',
    'bp':'10',
    'address':'22|baker street|Tronoh, Kolo Piloh',
    'toemail':'abu@websitekoi.kom',
    'ccemail':'',
    'outstanding':'315.50'
  };


  contentBlock = 
        '<p>Name: ' + baInfo.name + '</p>' +
        '<p>Bill Cycle: ' + baInfo.bp + '</p>' +
        '<p>Bill Media: ' + baInfo.billmedia + '</p>' +
        '<p>Address: ' + baInfo.address + '</p>' +
        '<p>To Email: ' + baInfo.toemail + '</p>' +
        '<p>CC Email: ' + baInfo.ccemail + '</p>' +
        '<p>Mobile No: ' + baInfo.mobileno + '</p>' +
        '<p>Current Outstanding: ' + baInfo.outstanding + '</p>';

  mainView.loadPage("ba_summary.html");
  
}

function searchOrder(){
  SearchParam = myApp.formToData('#order-s-form');

if(SearchParam.ordernumber){
    SharedSearch.searchID = SearchParam.ordernumber;
  } else {
    myApp.alert('Input must not be empty', 'Error');
    return;
  }

  SharedSearch.searchFrom = 'searchOrder';

  sblActivity = {'activities':[
    {
      'number':'1-45623125',
      'status':'processing',
      'name':'sample order 1'
    },
    {
      'number':'1-45623126',
      'status':'done',
      'name':'sample order 2'
    },
    {
      'number':'1-45623127',
      'status':'pending',
      'name':'sample order 3'
    },
    {
      'number':'1-45623125',
      'status':'processing',
      'name':'sample order 1'
    },
    {
      'number':'1-45623126',
      'status':'done',
      'name':'sample order 2'
    },
    {
      'number':'1-45623127',
      'status':'pending',
      'name':'sample order 3'
    }
  ]};

  swiftActivity = {'activities':[
    {
      'number':'1-45623125',
      'status':'processing',
      'name':'sample order 1'
    },
    {
      'number':'1-45623126',
      'status':'done',
      'name':'sample order 2'
    }
  ]};

  mainView.loadPage("order_summary.html");
}

function validateLogin(){
  // myApp.alert('Username: ' + UsersInfo.username + ', Password: ' + UsersInfo.password + ', admin: ' + UsersInfo.adminmode, function () {
  loggedIn = true;
  myApp.params.swipePanel = 'right';
  mainView.loadPage("index.html");
  // });
}

// Billing related functions
function getTrialBill(){
  SearchParam = myApp.formToData('#order-s-form');
  SearchParam.sType = "searchOrder";
//  alert(SBA_SearchParam.banumber);

  mainView.loadPage("order_summary.html");
}

function baLoadAccInfo(blockname){
  document.getElementById(blockname).innerHTML = contentBlock;
}

function soLoadSiebelActivity(activityArr, blockname){
  var sblAContent = '<ul>';
  var itemcount = 0;
  for(act in activityArr.activities){
    itemcount = itemcount + 1;
    var sblItem = 
      '<li class="item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">' + activityArr.activities[act].number + '</div>' +
            '<div class="item-after">' + activityArr.activities[act].name + '</div>' +
            '<div class="item-after">' + activityArr.activities[act].status + '</div>' +
          '</div>' +
        '</div>' +
      '</li>';

      sblAContent = sblAContent + sblItem;
  }

  if(itemcount == 0){
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

  document.getElementById(blockname).innerHTML = sblAContent;

}

function cHttpGet(theURL){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",theURL,false);
  Httpreq.send(null);
  return Httpreq.responseText;   
}

function createIris(){
  var irisForm = myApp.formToData('#c-iris-form');



}



