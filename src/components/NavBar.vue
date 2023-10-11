<template>
    <nav>
        <ul>
            <li><router-link to="/about/">About</router-link></li>
            <li><router-link to="/registration/">Sign-Up</router-link></li>
            <li><router-link to="/auth/">Sign-In</router-link></li>
            <li><router-link to="/users/">All Users</router-link></li>
            <li><router-link to="/user/">Your profile</router-link></li>
            <li><router-link to="/company/">Company profile</router-link></li>
            <li><router-link to="/companies/">All companies</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style scoped>

nav {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin-right: 10px;
}
a {
    color: rgb(0, 0, 0);
    text-decoration: none;
}
</style>
