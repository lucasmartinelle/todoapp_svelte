<script>
    import Task from "./task.svelte";

    export let tasks;

    export let changeDone;
    export let showModalDeleteTask;
    export let filterTask;
    export let sortTask;

    let titre;
    let dateEcheance;
    let status;
    let sortOption;
</script>
<div class="text-white text-start container mt-5">
    <div class="d-flex justify-content-end mb-4">
        <a 
            type="button" 
            class="btn btn-outline-light"
            href="/create">Créer une tâche</a>
    </div>
    <div class="row justify-content-center align-items-center">
        <div class="col-lg-4 mb-3">
            <div class="form-group">
                <label for="titre" class="fw-bold">Titre</label>
                <input 
                    type="text" 
                    class="form-control bg-transparent text-white" 
                    id="filtre_titre" 
                    name="filtre_titre"
                    on:change={(event) => titre = event.target.value }>
            </div>
        </div>
        <div class="col-lg-4 mb-3">
            <div class="form-group">
                <label for="filtre_dateEcheance" class="fw-bold">Date d'échéance</label>
                <input 
                    type="date" 
                    class="form-control bg-transparent text-white" 
                    id="filtre_dateEcheance" 
                    name="filtre_dateEcheance"
                    on:change={(event) => dateEcheance = event.target.value }>
            </div>
        </div>
        <div class="col-lg-4 mb-3">
            <div class="form-group">
                <label for="filtre_status" class="fw-bold">Status</label>                
                <select 
                    class="form-control bg-transparent text-white" 
                    id="filtre_status" 
                    name="filtre_status"
                    on:change={(event) => status = event.target.value }>
                    <option class="text-dark" value="*" SELECTED>Tous</option>
                    <option class="text-dark" value="a_faire">A faire</option>
                    <option class="text-dark" value="fait">Fait</option>
                </select>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div class="form-group">
                <label for="tri" class="fw-bold">Trier par</label>
                <select 
                    class="form-control bg-transparent text-white" 
                    id="tri" 
                    name="tri"
                    on:change={(event) => sortOption = event.target.value }>
                    <option class="text-dark" value="priorite" SELECTED>Priorite</option>
                    <option class="text-dark" value="urgence">Urgence (date d'échéance)</option>
                    <option class="text-dark" value="status">Status (fait / à faire)</option>
                </select>
            </div>
        </div>
        <div class="col-12 mb-3 text-center">
            <button 
                type="button"
                class="btn btn-outline-light me-3"
                on:click={() => filterTask(titre, dateEcheance, status)}>
                Fitrer
            </button>
            <button 
                type="button"
                class="btn btn-outline-light"
                on:click={() => sortTask(sortOption)}>
                Trier
            </button>
        </div>
    </div>
</div>
{#each tasks as task, index}
    {#if task.show }
        <Task {task} {index} {changeDone} {showModalDeleteTask} />
    {/if}
{/each}
<table class="text-white m-auto mt-4" cellpadding="5px" cellspacing="0">
    <thead>
        <tr>
            <th>Couleur</th>
            <th>Signification</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td bgcolor="#a00101">&nbsp;</td>
            <td class="ps-4">urgente (priorité maximale)</td>
        </tr>
        <tr>
            <td bgcolor="#d98900">&nbsp;</td>
            <td class="ps-4">A traiter dès que possible</td>
        </tr>
        <tr>
            <td bgcolor="#e2c805">&nbsp;</td>
            <td class="ps-4">A traiter lorsque c'est possible</td>
        </tr>
        <tr>
            <td bgcolor="#111213">&nbsp;</td>
            <td class="ps-4">Peu attendre</td>
        </tr>
    </tbody>
</table>