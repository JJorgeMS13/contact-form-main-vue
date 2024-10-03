<template>
    <section class="card">
        <div class="container">
            <header>
                <picture>
                    <img src="../assets/images/icon-success-check.svg" alt="icon of message success">
                </picture>
                <h2>Message Sent!</h2>
            </header>
            <p>
                Thanks for completing the form, We´ll be in touch soon!
            </p>
        </div>
    </section>
</template>

<script>

</script>

<style lang="scss" scoped>
.card {
    position: fixed;
    margin: 2.4rem;
    .container {
        display: flex;
        flex-direction: column;
        gap: .8rem;
        padding: 2.4rem;
        border: none;
        border-radius: 1.2rem;
        background-color: $grey-900;
        color: white;

        header {
            display: flex;
            gap: .8rem;

            picture {
                height: 2.4rem;
                width: 2.4rem;
            }
             
            h2 {
                font-size: 1.8rem;
                font-weight: 700;
            }
        }

        p {
            color: $green-200;
            font-size: 1.6rem;
            font-weight: 400;
        }
    }
}
@media screen and (min-width: 48rem) {
    .card {
        left: 50%;
        transform: translate(-50%, 10%);
        .container {
            width: 45rem;
        }
    }
}
@media screen and (min-width: 64rem) {
    .card {
        transform: translate(-50%, 45%);
    }
}
</style>