$(() => {
    $.get('/posts', appendToList)

    $('form').on('submit', function(event) { //not working for arrow function
        event.preventDefault()
        let form = $(this)
        let postData = form.serialize() // transforms to url-encoded notation
        console.log("postData:",postData);
        
        $.ajax({
            type: 'POST', url: '/posts', data: postData
        }).done((postName) => {
            //no body found for POSTMAN requests
            
            appendToList([postName])
            form.trigger('reset')
        })
    })
    
    $('.post-list').on('click', 'a[data-post]', function(event){
        if(!confirm("Are you absolutely sure?")){
            return false
        }

        let target =$(event.currentTarget)

        $.ajax({
            type: 'DELETE', url: `/posts/${target.data('post')}`
        }).done(function(){
            target.parents('li').remove()
        })
    })

    function appendToList(posts) {
        let list = []
        let content, post
        for(let i in posts){
            post = posts[i]
            content = `
                <a href="/posts/${post}">${post}</a>
                <a href="#" data-post="${post}"><img class="delete" src="delete.png"></a>
                `
            list.push($('<li>', {html: content}))
        }
        $('.post-list').append(list)
    }
})

