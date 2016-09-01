angular.module('builtright').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/builds/build_detail.html',
    "<md-card class=\"md-padding\">\n" +
    "  <h1>Build Detail</h1>\n" +
    "</md-card>\n" +
    "<md-card>\n" +
    "  <md-card-content>\n" +
    "    <h2>Build Info</h2>\n" +
    "    <p>Make / Model / Year / Trim</p>\n" +
    "  </md-card-content>\n" +
    "  <md-card-footer>\n" +
    "  Card footer\n" +
    "  </md-card-footer>\n" +
    "  <div class=\"md-actions\" layout=\"row|column\" layout-align=\"start|end|center start|end|center\">\n" +
    "     <md-button>content</md-button>\n" +
    "   </div>\n" +
    "</md-card>\n" +
    "\n" +
    "<md-card>\n" +
    "  <md-card-content>\n" +
    "    <h2>Parts</h2>\n" +
    "    <p>Upgrades and Parts</p>\n" +
    "  </md-card-content>\n" +
    "  <md-card-footer>\n" +
    "  Card footer\n" +
    "  </md-card-footer>\n" +
    "  <div class=\"md-actions\" layout=\"row|column\" layout-align=\"start|end|center start|end|center\">\n" +
    "     <md-button>content</md-button>\n" +
    "   </div>\n" +
    "</md-card>\n" +
    "\n" +
    "<md-card>\n" +
    "  <md-card-content>\n" +
    "    <h2>Timeline</h2>\n" +
    "    <p>Series of Events</p>\n" +
    "  </md-card-content>\n" +
    "  <md-card-footer>\n" +
    "  Card footer\n" +
    "  </md-card-footer>\n" +
    "  <div class=\"md-actions\" layout=\"row|column\" layout-align=\"start|end|center start|end|center\">\n" +
    "     <md-button>content</md-button>\n" +
    "   </div>\n" +
    "</md-card>"
  );


  $templateCache.put('app/modules/builds/builds.html',
    "<md-content class=\"md-padding\">\n" +
    "  <md-card-content>\n" +
    "    <h2>Builds</h2>\n" +
    "  </md-card-content>\n" +
    "  <div layout=\"row\" layout-xs=\"column\">\n" +
    "    <md-card ng-repeat=\"build in vm.builds\" flex flex-gt-xs=\"30\" class=\"md-padding\">\n" +
    "      <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "          <span class=\"md-headline\">{{ build.name }}</span>\n" +
    "        </md-card-title-text>\n" +
    "      </md-card-title>\n" +
    "      <md-card-content>\n" +
    "        {{ build.year }} {{build.make}} {{build.model}}\n" +
    "      </md-card-content>\n" +
    "      <md-card-actions layout=\"row\" layout-align=\"end center\">\n" +
    "        <md-button ui-sref=\"home.build_detail({ id: build._id })\">View More</md-button>\n" +
    "        <!-- <md-button>Action 2</md-button> -->\n" +
    "      </md-card-actions>\n" +
    "    </md-card>\n" +
    "    <md-button ui-sref=\"home.create_build\" aria-label=\"add build\" class=\"md-fab md-primary\" md-ripple-size=\"full\" style=\"position: absolute; right: 35px; top: 10px; \">\n" +
    "      <i class=\"fa fa-plus\"></i>\n" +
    "    </md-button>\n" +
    "  </div>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/builds/create_build.html',
    "<md-card>\n" +
    "  <md-card-content>\n" +
    "    <h2>Create A Build <i class=\"fa fa-car\"></i></h2>\n" +
    "    <p>Start tracking your build by creating one here. Add parts, post some pictures, and then post your build to your profile.</p>\n" +
    "  </md-card-content>\n" +
    "  <form layout-padding ng-submit=\"vm.createBuild(build)\">\n" +
    "    <md-card-content flex=\"100\" class=\"md-inline-form\">\n" +
    "      <p>Name your build.</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Name</label>\n" +
    "        <input ng-model=\"build.name\" type=\"text\">\n" +
    "      </md-input-container>\n" +
    "      <p>What make is the car?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Vehicle make</label>\n" +
    "        <input type=\"text\" ng-model=\"build.make\">\n" +
    "      </md-input-container>\n" +
    "      <p>What model is it?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Vehicle Model</label>\n" +
    "        <input type=\"text\" ng-model=\"build.model\">\n" +
    "      </md-input-container>\n" +
    "      <p>Any special series or trim?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Trim</label>\n" +
    "        <input type=\"text\" ng-model=\"build.trim\">\n" +
    "      </md-input-container>\n" +
    "      <p>Tell us what color it is.</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Color</label>\n" +
    "        <input type=\"text\" ng-model=\"build.color\">\n" +
    "      </md-input-container>\n" +
    "      <p>Does it have an engine swap? If so, what engine is currently in the car?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Options</label>\n" +
    "        <input type=\"text\" ng-model=\"build.options\">\n" +
    "      </md-input-container>\n" +
    "      <p>Does it have an engine swap? If so, what engine is currently in the car?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Swap</label>\n" +
    "        <input type=\"text\" ng-model=\"build.swap\">\n" +
    "      </md-input-container>\n" +
    "      <p>How many miles are on the car? </p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Mileage</label>\n" +
    "        <input type=\"text\" ng-model=\"build.mileage\">\n" +
    "      </md-input-container>\n" +
    "      <p>Almost finished! Anything else you want to note about the car?</p>\n" +
    "      <md-input-container layout=\"column\" flex-xs=\"100\" flex-gt-xs=\"50\">\n" +
    "        <label>Additional Notes</label>\n" +
    "        <textarea ng-model=\"build.notes\">\n" +
    "        </textarea>\n" +
    "      </md-input-container>\n" +
    "    </md-card-content>\n" +
    "  <div class=\"md-actions\" layout=\"row\" layout-align=\"center end\">\n" +
    "    <md-button ng-click=\"vm.createBuild(build);\" class=\"md-raised\" aria-label=\"create\" md-ripple-size=\"auto\">create</md-button>\n" +
    "  </div>\n" +
    "  </form>\n" +
    "</md-card>\n"
  );


  $templateCache.put('app/modules/home/dashboard.html',
    "<md-content class=\"md-padding\">\n" +
    "  <md-card-content>\n" +
    "    <h2>Dashboard</h2>\n" +
    "  </md-card-content>\n" +
    "  <div layout=\"row\" layout-xs=\"column\">\n" +
    "    <md-card flex flex-gt-xs=\"30\" class=\"md-padding\">\n" +
    "      <h2>View Your Builds</h2>\n" +
    "    </md-card>\n" +
    "    <md-card flex flex-gt-xs=\"30\" class=\"md-padding\">\n" +
    "      <h2>Add A Build</h2>\n" +
    "    </md-card>\n" +
    "    <md-card flex flex-gt-xs=\"30\" class=\"md-padding\">\n" +
    "      <h2>Share Your Build</h2>\n" +
    "    </md-card>\n" +
    "  </div>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "  <div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "    <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "      <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "        <div layout=\"row\">\n" +
    "          <div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "            <div>BuiltRight</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-list>\n" +
    "      <md-list-item ng-if=\"vm.user\">\n" +
    "        <div class=\"inset\"> \n" +
    "          <ng-md-icon icon=\"person\"></ng-md-icon> \n" +
    "        </div>\n" +
    "        <p> {{vm.user.email}} </p>\n" +
    "      </md-list-item>\n" +
    "      <md-list-item ui-sref=\"home.dashboard\">\n" +
    "        <div class=\"inset\">\n" +
    "          <ng-md-icon icon=\"apps\"></ng-md-icon>\n" +
    "        </div>\n" +
    "        <p> Dashboard </p>\n" +
    "      </md-list-item>\n" +
    "      <md-list-item ui-sref=\"home.builds\">\n" +
    "        <div class=\"inset\">\n" +
    "          <ng-md-icon icon=\"directions_car\"></ng-md-icon>\n" +
    "        </div>\n" +
    "        <p> Builds </p>\n" +
    "      </md-list-item>\n" +
    "      <!--    <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p > {{ item.name }}</p>\n" +
    "            </md-list-item> -->\n" +
    "      <!-- <md-divider></md-divider> -->\n" +
    "      <!-- <md-subheader>Admin</md-subheader> -->\n" +
    "      <!--     <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\" >\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item> -->\n" +
    "    </md-list>\n" +
    "  </div>\n" +
    "</md-sidenav>\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "  <md-toolbar ng-show=\"!showSearch\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "        <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "      </md-button>\n" +
    "      <!-- <h3 show-xs>BuiltRight</h3> -->\n" +
    "      <!--       <span flex></span>\n" +
    "      <md-button hide-xs hide-sm aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "        <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "      </md-button> -->\n" +
    "      <md-menu>\n" +
    "        <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "          <md-icon> more_vert </md-icon>\n" +
    "        </md-button>\n" +
    "        <md-menu-content width=\"4\">\n" +
    "          <!--  <md-menu-item>\n" +
    "            <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "              <md-icon>face</md-icon>\n" +
    "              Profile\n" +
    "            </md-button>\n" +
    "          </md-menu-item> -->\n" +
    "          <!-- <md-menu-item>\n" +
    "            <md-button ng-click=\"layout.changePassword()\">\n" +
    "              <md-icon>lock</md-icon>\n" +
    "              Password\n" +
    "            </md-button>\n" +
    "          </md-menu-item> -->\n" +
    "          <!-- <md-menu-divider></md-menu-divider> -->\n" +
    "          <md-menu-item>\n" +
    "            <md-button ng-click=\"layout.logOut()\">\n" +
    "              <md-icon>power_settings_new</md-icon>\n" +
    "              Logout\n" +
    "            </md-button>\n" +
    "          </md-menu-item>\n" +
    "        </md-menu-content>\n" +
    "      </md-menu>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "        <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "      </md-button>\n" +
    "      <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "      <md-input-container md-theme=\"input\" flex>\n" +
    "        <label>&nbsp;</label>\n" +
    "        <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "      </md-input-container>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "    <div ui-view></div>\n" +
    "  </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/main-page/main-page.html',
    "    <md-toolbar ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3>\n" +
    "                <a href=\"/\">BuiltRight - The Car Build Tracking App</a>\n" +
    "            </h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "                <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-menu>\n" +
    "                <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "                            <md-icon> more_vert </md-icon>\n" +
    "                </md-button>\n" +
    "                <md-menu-content width=\"4\">\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "                            <md-icon>face</md-icon>\n" +
    "                            Profile\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changePassword()\">\n" +
    "                            <md-icon>lock</md-icon>\n" +
    "                            Password\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-divider></md-menu-divider>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.logOut()\">\n" +
    "                            <md-icon>power_settings_new</md-icon>\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                </md-menu-content>\n" +
    "            </md-menu>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "            <md-input-container md-theme=\"input\" flex>\n" +
    "                <label>&nbsp;</label>\n" +
    "                <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content class=\"md-blue-grey-theme\" flex md-scroll-y>\n" +
    "        <ui-view layout=\"column\" layout-fill layout-padding>\n" +
    "\n" +
    "\n" +
    "        </ui-view>\n" +
    "    </md-content>\n"
  );


  $templateCache.put('app/modules/layouts/side-nav/sidenav.html',
    "<md-toolbar class=\"md-tall md-hue-2\">\n" +
    "  <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "  </div>\n" +
    "</md-toolbar>\n" +
    "<md-list>\n" +
    "  <md-list-item ng-if=\"\" ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo(item.link)\">\n" +
    "    <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "      <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "    </div>\n" +
    "    <p> {{ item.name }}</p>\n" +
    "  </md-list-item>\n" +
    "  <md-divider></md-divider>\n" +
    "  <!-- <md-subheader ng-show=\"vm.user.admin\">Admin</md-subheader> -->\n" +
    "<!--   <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\">\n" +
    "    <div class=\"inset\">\n" +
    "      <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "    </div>\n" +
    "    <p> {{ item.title }}</p>\n" +
    "  </md-list-item> -->\n" +
    "</md-list>\n"
  );


  $templateCache.put('app/modules/login/login.html',
    "<md-content flex-gt-xs=\"50\" flex-offset-gt-sm=\"25\" layout-padding md-whiteframe=\"3\" style=\"padding: 25px 25px; margin-top: 25px;\">\n" +
    "  <h1 class=\"text-center\">Login</h1>\n" +
    "  <form ng-submit=\"vm.loginUser(user);\" layout=\"column\" flex=\"100\">\n" +
    "    <md-input-container flex>\n" +
    "      <label>Email</label>\n" +
    "      <input ng-model=\"user.username\" type=\"email\">\n" +
    "    </md-input-container>\n" +
    "    <md-input-container flex>\n" +
    "      <label>Password</label>\n" +
    "      <input ng-model=\"user.password\" type=\"password\" minlength=\"6\">\n" +
    "    </md-input-container>\n" +
    "    <md-button class=\"md-raised\" aria-label=\"description\" ng-click=\"vm.loginUser(user)\" md-ripple-size=\"full\">Login</md-button>\n" +
    "  </form>\n" +
    "  <div class=\"md-actions\" layout=\"column\" layout-align=\"center center\">\n" +
    "    <md-button ui-sref=\"home.register\">Not a user? Sign up here.</md-button>\n" +
    "  </div>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/login/register.html',
    "<md-content md-whiteframe=\"3\" flex=\"50\" flex-offset=\"25\" flex-xs=\"100\" flex-offset-xs=\"0\" layout-gt-sm=\"column\" layout-padding style=\"padding: 25px 25px; margin-top: 25px;\">\n" +
    "    <h1 class=\"text-center\">Sign up for BuiltRight</h1>\n" +
    "    <md-input-container>\n" +
    "      <label>Email</label>\n" +
    "      <input ng-model=\"user.email\" type=\"email\">\n" +
    "    </md-input-container>\n" +
    "    <md-input-container>\n" +
    "      <label>Password</label>\n" +
    "      <input ng-model=\"user.password\" type=\"password\" minlength=\"6\">\n" +
    "    </md-input-container>\n" +
    "    <md-button class=\"md-raised\" aria-label=\"description\" ng-click=\"vm.createUser(user)\" md-ripple-size=\"full\">Sign up </md-button>\n" +
    "    <div class=\"md-actions\" layout=\"column\" layout-align=\"center center\">\n" +
    "      <md-button ui-sref=\"home.login\">Already a user? Login.</md-button>\n" +
    "    </div>\n" +
    "</md-content>\n"
  );

}]);
