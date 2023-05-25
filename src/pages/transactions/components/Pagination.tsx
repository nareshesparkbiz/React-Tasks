import "../../.././assets/styles/pagination.css";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { paginationType } from "../../../model/type";

interface typePagination {
  page: paginationType;
  changepageno: any;
}

export const Pagination = (props: typePagination) => {
  const pagination = props.page;
  const changepageno = props.changepageno;

  const languageData = useAppSelector((state) => {
    return state.languageSelection;
  });

  return (
    <div className="pages">
      {pagination.pageno - 1 >= 1 && (
        <>
          <div className="page1" onClick={() => changepageno(1)}>
            <span>{languageData["firstPage"]}</span>
          </div>
          <div
            className="page1"
            onClick={() => changepageno(pagination.pageno - 1)}
          >
            <span>{languageData["prev"]}</span>
          </div>
        </>
      )}

      {pagination.pageno + pagination.showPage < pagination.totalpageCount ? (
        <>
          {pagination.list
            .slice(
              pagination.pageno - 1,
              pagination.pageno - 1 + pagination.showPage
            )
            .map((pageno: number, index) =>
              pagination.pageno == Number(pageno) ? (
                <div
                  className="page1 animate1page"
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
                  className="page1 animate1page"
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
            <span>{languageData["next"]}</span>
          </div>
          <div
            className="page1"
            onClick={() => changepageno(pagination.totalpageCount)}
          >
            <span>{languageData["nextPage"]}</span>
          </div>
        </>
      )}
    </div>
  );
};
