<template>
  <!-- <v-system-bar color="primary" dark class="toolbar elevation-2"> -->
  <v-app-bar
    color="primary"
    app
    dark
    min-height="84"
    height="84"
  >
    <!-- 
      <v-text-field v-if="isLoggedIn"
      class="styled-input"
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="search clients"
          single-line
          hide-details
        ></v-text-field> -->
    <v-btn
      text
      class="capital--btn btn--plain mr-12"
      @click="$router.push('/')"
    >
      <img
        style="width: 180px;"
        src="@/assets/logo-file-evictions.svg"
      >
    </v-btn>
    
    <v-spacer />
 
    <v-btn 
      text 
      class="capital--btn btn--plain mr-12" 
      @click="$router.push('/')"
    >
      Home
    </v-btn>
    <v-btn
      text
      class="capital--btn btn--plain mr-12"
      @click="$router.push('/properties')"
    >
      Properties
    </v-btn>

    <!-- <span v-if="isLoggedIn"> -->
    <!-- <span >
        <v-badge
        :content="messages"
        :value="messages"
        overlap
      >
      <v-btn icon>
        <v-icon color='white' small >mdi-bell</v-icon>
      </v-btn>
        </v-badge>
        </span>

        <span class="pr-2">
        <v-badge
        :content="cart"
        :value="cart"
        overlap
      >
      <v-btn icon @click="$router.push('/cart')">
        <v-icon color='white' small >mdi-cart</v-icon>
      </v-btn>
        </v-badge>
        </span> -->

    <!-- Check that the SDK client is not currently loading before accessing is methods -->

    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <v-btn
        v-if="!$auth.isAuthenticated"
        icon
        class="btn--plain"
        color="white"
        @click="login"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <!-- <v-btn
        icon
        v-if="$auth.isAuthenticated"
        class="btn--plain"
        color="white"
        @click="logout"
        ><v-icon>mdi-logout</v-icon></v-btn
      > -->
      <!-- <v-btn text v-if="!authenticated" small @click="login">login</v-btn> -->
      <!-- show logout when authenticated -->
      <!-- <v-btn text v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn> -->
      <!-- <v-btn icon v-if="authenticated" small @click="logout"><v-icon>mdi-logout</v-icon></v-btn> -->
      
      <div v-if="$auth.isAuthenticated">
        <v-menu
          v-model="menuVal"
          offset-y
          offset-x
          nudge-left="5"
          nudge-bottom="24"
          bottom
          rounded="menu-dropdown"  
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="btn--plain capital--btn"
              text
              @click="direction = 'up'"
              v-on="on"
            >
              <v-avatar
                size="40"
                class="mr-1"
              >
                <v-img
                  v-if="client.picture"
                  :src="client.picture"
                />
                <v-avatar
                  v-else-if="client.name"
                  color="white"
                >
                  <span
                    class="primary--text"
                  >{{ client.firstName.slice(0, 1)
                  }}{{ client.lastName.slice(0, 1) }}</span>
                </v-avatar>
              </v-avatar>
              <span class="px-2">Hello{{ client.firstName ? ", " + client.firstName + "!" : "!" }}</span>
              <v-icon>mdi-menu-{{ direction }}</v-icon>
            </v-btn>
          </template>
          <v-alert
            class="py-0 my-0"
            border="bottom"
            color="accent_light"
            colored-border
            tile
          >
            <v-list flat>
              <template v-for="(item, i) in items">
                <v-list-item
                  :key="i"
                  class="py-1"
                  @click="
                    () => {
                      direction = 'down';
                      item.onclick();
                    }
                  "
                >                  
                  <v-list-item-icon class="info--text">                    
                    <i
                      :class="`icofont-${item.icon}`"
                      style="font-size: 1rem"
                    />
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="info--text font-weight-medium info--text text-uppercase caption">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="i < items.length - 1"
                  :key="i + 'divider'"
                />
              </template>
            </v-list>
          </v-alert>
        </v-menu>
      </div>      
    </div>    

    <!-- <v-btn icon>
        <v-icon color='white' small @click="logout">mdi-logout</v-icon>
      </v-btn> -->

    <!-- </span> -->
  </v-app-bar>
</template>

<script>
// const PATH_TO_PROTECTED_ROUTE = '/'
export default {
  name: "Toolbar",
  data() {
    return {
      messages: 12,
      menuVal: false,
      items: [
        { title: "PROFILE", icon: 'user-alt-7', onclick: () => {this.$router.push('/profile')} },
        { title: 'Password', icon: 'key', onclick: () => {this.$router.push('/change-password')} },
        { title: "Support", icon: "wrench", onclick: () => {this.$router.push('/support')} },
        { 
          title: "Upcoming", 
          icon: "megaphone-alt", 
          onclick: () => {            
            window.open("https://fileevictions.com/upcoming-features/", "_blank");
          }
        },
        { title: "LOG OUT", icon: "sign-out", onclick: this.logout },
      ],
    };
  },
  // props: {
  //   authenticated: Boolean,
  // },
  computed: {
    cart() {
      return this.$store.getters.cartTotal;
    },
    client() {      
      return this.$store.getters.client;
    },
    direction() {
      return this.menuVal ? "up" : "down";
    },
  },
  methods: {
    // logout: function(){
    //   this.$store.dispatch('logout')
    //   .then(()=>{
    //     this.$router.push('/login')
    //   })
    // }

    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  $menu-content-border-radius: 0 0 10px 10px;
</style>

<style>
.rounded-menu-dropdown {
  border-radius: 0 0 10px 10px !important;
}

.toolbar {
  height: 40px;
}

.styled-input {
  transform: scale(0.7);
  transform-origin: left;
  margin-top: -12px;
  width: 10vw;
}

span.v-badge__badge.primary {
  height: 5px;
  font-size: 11px;
  padding: 0;
  min-width: 0;
}
</style>