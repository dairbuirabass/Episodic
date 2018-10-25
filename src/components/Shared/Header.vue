<template>
    <ul class="nav justify-content-end">
        <router-link to="/" tag="li" active-class="active" class="nav-item">
            <a class="nav-link text-light">Home</a>
        </router-link>
        <router-link to="/addSerial" tag="li" active-class="active" class="nav-item">
            <a class="nav-link text-light">Add Serial</a>
        </router-link>
        <router-link to="/serial/" tag="li" active-class="active" class="nav-item">
            <a class="nav-link text-light">Serial</a>
        </router-link>
    </ul>
</template>
