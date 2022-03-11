<template>
    <RouterLink 
    to="/"
    class="logo">
        <span>OMDbAPI</span>.COM
    </RouterLink>
</template>

<style lang="scss" scoped>
.logo{
    font-family: "Oswald", sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: $black;
    text-decoration: none;
    &:hover {
        color:$black;

    }
    span {
        color: $primary;
    }
}

</style>