<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Autonomous Airship GDP
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          What do you want to do?
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Command',
          caption: 'Control me using voice commands',
          icon: 'record_voice_over',
          link: '/#/command'
        },
        {
          title: 'Sounds',
          caption: 'Use my speakers to play music',
          icon: 'speaker',
          link: '/#/sounds'
        },
        {
          title: 'Lights',
          caption: 'Change the colour of my lights',
          icon: 'lightbulb',
          link: '/#/lights'
        },
        {
          title: 'Help',
          caption: 'Tips on how to use this web app',
          icon: 'help',
          link: '/#/help'
        },
        {
          title: 'Report',
          caption: '"Houston, we have a problem!"',
          icon: 'problem',
          link: '/#/report'
        }
      ]
    }
  }
}
</script>
