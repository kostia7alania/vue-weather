<template>
    <section>
        <div class="location">{{ location }}</div>
        <div class="weather__description">{{ description }}</div>
        <img class="weather__icon" :src="icon" :alt="description">
    </section>
</template>

<script>
export default {
    name: 'Weather',
    computed: {
        icon() { return this.$store.state.weather.icon },
        description() { return this.$store.state.weather.description },
        location() { return this.$store.state.weather.location }
    } 
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.location {
    text-transform: uppercase;
    font-weight: bold;
}

.weather__description {
    text-transform: lowercase;
    margin-left: 10%;
    margin-right: 10%;
    text-align: center;
}

.weather__description:first-letter {
    text-transform: uppercase;
}

.weather__icon {
    width: 12em;
    padding-bottom: 9em;
}
</style>
