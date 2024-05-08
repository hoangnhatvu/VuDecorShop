import React, { useState, useEffect } from "react";

import PageTitle from "app/components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Input,
  Select,
  Label,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon, SearchIcon, ForbiddenIcon } from "icons";
import Layout from "app/containers/Layout";
import { toast } from "react-toastify";
import Loader from "app/components/Loader/Loader";
import { getProducts } from "pages/api/productApis";
import { formatCurrency } from "utils/formatCurrency";
import AddProductModal from "app/components/Product/AddProductModal";

function Product() {
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const optionsStatusProduct = [
    { id: "", value: "Tất cả" },
    { id: "true", value: "Đang bán" },
    { id: "false", value: "Dừng bán" },
  ];

  const optionsOrderProduct = [
    { id: "", value: "Mặc định" },
    { id: "sortByNameProduct", value: "Tên sản phẩm" },
    { id: "sortByPriceAscending", value: "Giá" },
    { id: "sortByCreatedDate", value: "Ngày tạo" },
    { id: "sortByPopularity", value: "Phổ biến nhất" },
  ];

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await getProducts(currentPage, limit);
      setListProduct(responseResults.data);
      setTotalCount(responseResults.totalCount);
      setTotalPage(responseResults.totalPage);
    } catch (error: any) {
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        toast.error(messages.join("\n"));
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    loadData();
    return () => {
      setListProduct([]);
    };
  }, [currentPage]);

  return (
    <Layout>
      <PageTitle>Sản phẩm</PageTitle>
      <div className="flex justify-between mb-4">
        <div className="flex flex-1">
          <div className="relative w-full max-w-sm mr-2 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Search"
            />
          </div>
          <Button>Tìm kiếm</Button>
        </div>
        <Button onClick={openModal}>Thêm sản phẩm</Button>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center w-full max-w-96 mr-20">
          <Label className="mr-4">Trạng thái</Label>
          <Select
            className="flex flex-1 relative w-full max-w-xs"
            onChange={() => {}}
          >
            {optionsStatusProduct.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center w-full max-w-md">
          <Label className="mr-4">Sắp xếp theo</Label>
          <Select
            className="flex flex-1 relative w-full max-w-xm"
            onChange={() => {}}
          >
            {optionsOrderProduct.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Giá tạm thời</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          {isLoading ? (
            <Loader />
          ) : (
            <TableBody>
              {listProduct.map((product, i) => (
                <>
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-3 md:block"
                          src={product.product_image}
                          alt="Product image"
                        />
                        <div>
                          <p className="font-semibold">
                            {product.product_name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {product.category.category_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatCurrency(product.temp_price)} VNĐ
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge type={product.is_actived ? "success" : "danger"}>
                        {product.is_actived ? "Đang bán" : "Dừng bán"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(product.created_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="small" aria-label="Edit">
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="small" aria-label="Delete">
                          <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          )}
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalCount}
            resultsPerPage={limit}
            onChange={handleChangePage}
            label="Product navigation"
          />
        </TableFooter>
      </TableContainer>
      <AddProductModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        loadDataProduct={loadData}
      />
    </Layout>
  );
}

export default Product;
