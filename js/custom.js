/** Video : 43 for async and wait  **/

async function fetchWithTimeout(resource) 
{
  console.log('* fetchWithTimeout *');
  const timeout           = 9000;  
  const controller        = new AbortController();
  const idAbortController = setTimeout(() => { 
    console.log('* Abort controller due to the Timeout!! *'); 
    controller.abort();
    
  }, timeout);

  const response = await fetch(resource, { signal: controller.signal });

  /* Delete the timeout when fecth works fine   */
  clearTimeout(idAbortController); 
  console.log('* Fetch API get the response! *');
  return response;
}

async function loadUsers() 
{
  console.log('* loadUsers-1 *');
  try 
  {
    console.log('* loadUsers-2 *');
    const response = await fetchWithTimeout('https://randomuser.me/api');
    console.log('* loadUsers-3 *');
    //console.log(response);
    console.log('* loadUsers-4 *');
    const users = response.json();
    console.log('* loadUsers-5 *');
    return users;
  } 
  catch (error) 
  {
    console.log('* loadUsers-6 *');
    if(error.name=='AbortError')
    {
      console.log('* loadUsers-7 *');
      console.log('* AbortError due to timeout *');
    }
  }
}
loadUsers().then(
  function(value) 
  { 
    if(Array.isArray(value.results)  )
    {
      updateUserInfo(value.results[0])
    }
  },
  function(error) 
  { 
    console.log(error); 
  }
);

function updateUserInfo(user)
{
  let name = '';
  console.log('updateUserInfo')

  if(typeof user['email'] !== 'undefined' && user['email'] !== null ) 
  {
    document.querySelector('#email').textContent = user['email'];
  }
  else
  {
    document.querySelector('#email').textContent = '';
  }


  if(typeof user['name']['title'] !== 'undefined' && user['name']['title'] !== null ) 
  {
    name = user['name']['title'];
  }

  if(typeof user['name']['first'] !== 'undefined' && user['name']['first'] !== null ) 
  {
    name = name + ' ' + user['name']['first'];
  }

  if(typeof user['name']['last'] !== 'undefined' && user['name']['last'] !== null ) 
  {
    name = name + ' ' + user['name']['last'];
  }

  if(name != '' ) 
  {
    document.querySelector('#name').textContent = name;
  }
  else
  {
    document.querySelector('#name').textContent = '';
  }

  
  if(typeof user['location']['city'] !== 'undefined' && user['location']['city'] !== null ) 
  {
    document.querySelector('#city').textContent =  user['location']['city'];
  }
  else
  {
    document.querySelector('#city').textContent = '';
  }

  if(typeof user['location']['state'] !== 'undefined' && user['location']['state'] !== null ) 
  {
    document.querySelector('#state').textContent =  user['location']['state'];
  }
  else
  {
    document.querySelector('#state').textContent = '';
  }


  if(typeof user['location']['country'] !== 'undefined' && user['location']['country'] !== null ) 
  {
    document.querySelector('#country').textContent =  user['location']['country'];
  }
  else
  {
    document.querySelector('#country').textContent = '';
  }
  

  if(typeof user['picture']['large'] !== 'undefined' && user['picture']['large'] !== null ) 
  {
    document.querySelector('#image').setAttribute('src', user['picture']['large']);
  }
  else
  {
    document.querySelector('#image').setAttribute('src', '');
  }

}



document.querySelector('#next').addEventListener('click', function()
{
  loadUsers().then(
    function(value) 
    { 
      if(Array.isArray(value.results)  )
      {
        updateUserInfo(value.results[0])
      }
    },
    function(error) 
    { 
      console.log(error); 
    }
  );
});

console.log('* DONE *');
