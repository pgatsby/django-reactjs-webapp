import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ page, pages, keyword = "", staff }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => {
          const pageNumber = p + 1;
          const isActive = pageNumber === Number(page);

          return (
            <LinkContainer
              activeClassName={isActive ? "active" : "/"}
              key={pageNumber}
              to={{
                pathname: staff ? "/admin/products" : "",
                search: `?keyword=${keyword}&page=${pageNumber}`,
              }}
            >
              <Pagination.Item>{pageNumber}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;
