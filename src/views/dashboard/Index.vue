<template>
  <div>
    <the-navbar
      :actions="sidebarStatus"
      v-on:sidebaractions="onSidebarActions($event)"
    />
    <v-content>

      <the-sidebar-inbox v-show="sidebarStatus === '1'" />
      <the-sidebar-star v-show="sidebarStatus === '2'" />
      <the-sidebar-postpone v-show="sidebarStatus === '3'" />
      <the-sidebar-send v-show="sidebarStatus === '4'" />
      <the-sidebar-draft v-show="sidebarStatus === '5'" />
      <the-sidebar-important v-show="sidebarStatus === '6'" />
      <the-sidebar-arrangement v-show="sidebarStatus === '7'" />
      <the-sidebar-all v-show="sidebarStatus === '8'" />
      <the-sidebar-trash-email v-show="sidebarStatus === '9'" />
      <the-sidebar-trash-can v-show="sidebarStatus === '10'" />
      <the-sidebar-tags-settings v-show="sidebarStatus === '16'" />

    </v-content>
    <the-footer />
  </div>
</template>

<script>
import TheFooter from "./TheFooter"
import TheNavbar from "./TheNavbar"
import TheSidebarAll from "./TheSidebarAll"
import TheSidebarArrangement from "./TheSidebarArrangement"
import TheSidebarDraft from "./TheSidebarDraft"
import TheSidebarImportant from "./TheSidebarImportant"
import TheSidebarInbox from "./TheSidebarInbox"
import TheSidebarPostpone from "./TheSidebarPostpone"
import TheSidebarSend from "./TheSidebarSend"
import TheSidebarStar from "./TheSidebarStar"
import TheSidebarTagsSettings from "./TheSidebarTagsSettings"
import TheSidebarTrashCan from "./TheSidebarTrashCan"
import TheSidebarTrashEmail from "./TheSidebarTrashEmail"

export default {
  name: "Dashboard",
  components: {
    TheFooter,
    TheNavbar,
    TheSidebarAll,
    TheSidebarArrangement,
    TheSidebarDraft,
    TheSidebarImportant,
    TheSidebarInbox,
    TheSidebarPostpone,
    TheSidebarSend,
    TheSidebarStar,
    TheSidebarTagsSettings,
    TheSidebarTrashCan,
    TheSidebarTrashEmail
  },
  data() {
    return {
      sidebarStatus: "1"
    }
  },
  methods: {
    onSidebarActions(item) {
      this.sidebarStatus = item.id.toString()
    }
  }
}
</script>


