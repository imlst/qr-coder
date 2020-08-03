<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        const savedFavoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
        this.$store.commit('setFavoriteList', savedFavoriteList);
    }
}
</script>
