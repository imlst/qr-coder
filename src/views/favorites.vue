<template>
    <div class="content-tile">
        <div class="content-tile__nav">
            <router-link to="/">
                <font-awesome-icon :icon="['fas', 'qrcode']" style="margin-right: 5px;" />
                <span>Сгенерировать QR-код</span>
            </router-link>
        </div>

        <h3 style="margin-top: 0;">Избранное</h3>

        <div v-if="favoriteList.length" class="favorite-list">
            <div class="favorite-list__item" v-for="(favorite, index) in favoriteList" :key="index">
                <div class="favorite-list__item-remove">
                    <div class="favorite-list__item-remove-icon">
                        <font-awesome-icon :icon="['fas', 'trash']" @click="removeFavorite(favorite)" />
                    </div>
                </div>

                <div class="favorite-list__item-code">
                    <router-link :to="{ path: '/', query: { string: favorite } }">
                        <qrcode-vue :value="favorite" :size="60" level="H" />
                    </router-link>
                </div>

                <div class="favorite-list__item-value">
                    <router-link :to="{ path: '/', query: { string: favorite } }">
                        {{ favorite }}
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else style="color: #757575;">Пока здесь пусто, добавьте что-нибудь в избранное!</div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
    name: 'Favorites',

    components: {
        QrcodeVue,
    },

    computed: {
        favoriteList() {
            return this.$store.getters.getFavorites;
        },
    },

    methods: {
        removeFavorite(value) {
            this.$store.commit('removeFavorite', value);
            localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
        },
    },
}
</script>
