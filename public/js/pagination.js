function createPagination(){
    if(totalPages > 0){
        if(pageStartBefore == pageStart || pageEndBefore == pageEnd){
            return;
        }
        let htmlPagination = `
            {html-pagination}
            `;
        let liHtml = ``;
        
        for(let i = pageStart; i <= pageEnd;i++){
            liHtml += `
                <li class="page-item" id="page-${i}">
                    <a class="page-link relative block py-1.5 px-3 
                        rounded border-0 bg-transparent outline-none 
                        transition-all duration-300 rounded text-gray-800 
                        hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" href="#"
                        onclick='init(${i})'>
                    ${i}
                    </a>
                </li>`;
        }
        
        let htmlPaginationFinal = htmlPagination.replace('{html-pagination}',liHtml);
        $("#pagination").html(htmlPaginationFinal);
    }

}

function calculateDataPagination(pageC){
    pageCurrent = pageC;

    if(pageC >= totalPages || pageC == 1){
        return;
    }
    
    if(pageCurrent > pageEnd && pageEnd < totalPages){

        pageStartBefore = pageStart;
        pageEndBefore = pageEnd;
        pageStart = pageStartBefore + jump;
        
        if((pageEndBefore + jump) >= totalPages){
            pageEnd = totalPages;    
        }else{
            pageEnd = pageEndBefore + jump;    
        }
        createPagination();
        return;
    }
    if(pagePrevious >= jump && pageStart > jump){
        pageStart = pageStart - jump;
        pageEnd = pageEnd - jump;
        pageStartBefore = pageStartBefore -jump;
        pageEndBefore = pageEndBefore - jump;
        
    }
    createPagination();

}