const { ValidationError } = require('joi');
const analytics = require('../controller/AnalyticsController');
const { HttpResponse } = require('../const/responseCodes');
const Response = require('../utils/response');

module.exports = (router) => {
  router.post('/api/analytics/search-conversion/summary', async (ctx) => {
    const header = ctx.request.headers;
    const { query, from, size, dateFrom, dateTo } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      query,
      from,
      size,
      dateFrom,
      dateTo
    };
    try {
      const { statusCode, content } = await analytics.getSearchConversionSummary(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/search-conversion/list-weekly', async (ctx) => {
    const header = ctx.request.headers;
    const { query, from, size, trigger } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      query,
      from,
      size,
      trigger,
    };
    try {
      const { statusCode, content } = await analytics.getSearchConversionWeeklySummary(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/search-conversion/list', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo, filter, offset, size, sortField, sortOrder } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      filter,
      offset,
      sortField,
      sortOrder,
      size
    };
    try {
      const { statusCode, content } = await analytics.getConversionDataByQuery(
        data
      );

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/search-conversion/products-by-query', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo, searchQuery } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      searchQuery,
    };
    try {
      const { statusCode, content } = await analytics.getProductsForSearchQuery(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/search-conversion/summary-totals', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo} = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo
    };
    try {
      const { statusCode, content } = await analytics.getSearchConversionTotalData(
        data
      );

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/no-results-searches/list', async (ctx) => {
    const header = ctx.request.headers;
    const {
      dateFrom,
      dateTo,
      queryType,
      filter,
      offset,
      size,
      sortField,
      sortOrder
    } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      queryType,
      filter,
      sortField,
      sortOrder,
      offset,
      size
    };
    try {
      const { statusCode, content } = await analytics.getNoResultsData(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/no-results-searches/unique-queries', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo, queryType } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      queryType
    };
    try {
      const { statusCode, content } = await analytics.getNoResultsUniqueCount(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/no-results-searches/list-weekly', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo, queryType } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      queryType
    };
    try {
      const { statusCode, content } = await analytics.getNoResultsWeeklyData(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/product-coverage/list', async (ctx) => {
    const header = ctx.request.headers;
    const { filter } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      filter
    };
    try {
      const { statusCode, content } = await analytics.getProductCoverage(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/converted-products/queries', async (ctx) => {
    const header = ctx.request.headers;
    const { productId, dateFrom, dateTo } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      productId
    };
    try {
      const { statusCode, content } = await analytics.getProductConversionData(data);

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/converted-products/summary', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo
    };
    try {
      const { statusCode, content } = await analytics.getProductConversionsByDate(
        data
      );

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });

  router.post('/api/analytics/converted-products/product-totals', async (ctx) => {
    const header = ctx.request.headers;
    const { dateFrom, dateTo, productId } = ctx.request.body;
    const data = {
      storeId: header['store-id'],
      dateFrom,
      dateTo,
      productId
    };
    try {
      const { statusCode, content } = await analytics.getProductConversionsByProduct(
        data
      );

      if (statusCode !== HttpResponse.SUCCESS.OK.CODE) {
        return Response.error(ctx, {
          statusCode,
          content,
        });
      }
      return Response.success(ctx, {
        statusCode,
        content,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return Response.error(ctx, {
          statusCode: HttpResponse.CLIENT_ERROR.BAD_REQUEST.CODE,
          content: err.message,
        });
      }
      return Response.error(ctx, {
        statusCode: HttpResponse.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE,
        content: err.message,
      });
    }
  });
};
