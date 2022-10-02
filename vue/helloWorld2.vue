<template lang="">
    <div>
        <h1>Third type widget</h1>
        <h1>{{ hello }}</h1>
    </div>
</template>
<script setup>
    import { inject } from 'vue';
    const hello = inject('text');
</script>
<style>
    h1 {
        color: red;
    }
</style>