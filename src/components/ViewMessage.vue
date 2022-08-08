<template>
<v-card
    class="mx-auto"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-discord
      </v-icon>
      <span class="font-weight-light">{{message.name}}</span>
    </v-card-title>

    <v-card-text class="text font-weight-bold">
      {{message.text}}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-icon>
            mdi-calendar
        </v-icon>

        <v-list-item-content>
          <v-list-item-subtitle>{{getDate(message.created_at)}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
            <v-btn
                @click="$emit('close')"
                color="primary"
            >
                OK
            </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>

</template>

<script>
import getDate from "@/helpers/getDate";

export default {
    data() {
        return {
            getDate
        }
    },
    props: {
        message: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style>

</style>