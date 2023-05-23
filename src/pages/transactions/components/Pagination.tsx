import '../../.././assets/styles/pagination.css'



interface paginationType{
  list: string[];
  pageno: number;
  showPage:number;
  totalpageCount:number;
  pagelimit:number;
}


interface typePagination{
  page: paginationType;
  changepageno:any;
}

export const Pagination = (props:typePagination) => {
    const pagination = props.page;
    const changepageno = props.changepageno;
  
    return (
      <div className="pages">
        {pagination.pageno - 1 >= 1 && (
          <>
            <div className="page1" onClick={() => changepageno(1)}>
              <span>First-page</span>
            </div>
            <div
              className="page1"
              onClick={() => changepageno(pagination.pageno - 1)}
            >
              <span>Prev</span>
            </div>
          </>
        )}
  
        {(pagination.pageno + pagination.showPage) < pagination.totalpageCount ? (
          <>
            {pagination.list
              .slice(
                pagination.pageno - 1,
                pagination.pageno - 1 + pagination.showPage
              )
              .map((pageno:string, index) =>
                pagination.pageno == Number(pageno) ? (
                  <div
                    className=" animate1page"
                    key={index}
                    onClick={() => changepageno(pageno)}
                  >
                    <span>{pageno}</span>
                  </div>
                ) : (
                  <div
                    className="page1"
                    key={index}
                    onClick={() => changepageno(pageno)}
                  >
                    <span>{pageno}</span>
                  </div>
                )
              )}
  
            <div className="page1">
              <span>...</span>
            </div>
          </>
        ) : (
          <>
            {pagination.list
              .slice(pagination.pageno - 1, pagination.totalpageCount - 1)
              .map((pageno, index) =>
                pagination.pageno === Number(pageno) ? (
                  <div
                    className="animate1page"
                    key={index}
                    onClick={() => changepageno(pageno)}
                  >
                    <span>{pageno}</span>
                  </div>
                ) : (
                  <div
                    className="page1"
                    key={index}
                    onClick={() => changepageno(pageno)}
                  >
                    <span>{pageno}</span>
                  </div>
                )
              )}
            {pagination.pageno !== pagination.totalpageCount && (
              <div className="page1">
                <span>...</span>
              </div>
            )}
          </>
        )}
  
        {pagination.pageno + 1 <= pagination.totalpageCount && (
          <>
            <div
              className="page1"
              onClick={() => changepageno(pagination.pageno + 1)}
            >
              <span>Next</span>
            </div>
            <div
              className="page1"
              onClick={() => changepageno(pagination.totalpageCount)}
            >
              <span>Last-page</span>
            </div>
          </>
        )}
      </div>
    );
  };
  