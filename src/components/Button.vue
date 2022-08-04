<template>
    <button
    @click="onClick()"
    :style="{ background: color }"
    class="btn">{{text}}
    </button>
</template>

<script>
export default {
    name: 'Button-app',
    props:{
        text: String ,
        color: String ,
    },
    methods:{
        onClick(){
           this.$emit('btn-click');
        }
    }
}

</script>



<style>

</style>