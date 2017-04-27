package cn.jxufe.emlab.match.core;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.dao.DataAccessException;

import cn.jxufe.emlab.match.pojo.Operator;


public interface IBaseDao<T> {
	public List<T> findByName(String name) throws DataAccessException;
	public List publicFind(String queryString) throws DataAccessException;
	public Serializable save(T entity) throws DataAccessException; 
    public void save(Collection<T> entities);
	public void saveOrUpdate(T entity) throws DataAccessException;
	public void saveOrUpdate(Collection<T> entities) throws DataAccessException;
	public void delete(T entity) throws DataAccessException; 
	public void delete(Serializable id) throws DataAccessException;
	public T load(Serializable id) throws DataAccessException; 
	public List<T> find(String queryString) throws DataAccessException;
	public List<T> find(String queryString,List objs) throws DataAccessException;
	public List<T> find(T example) throws DataAccessException;
	public T findById(Serializable id) throws DataAccessException;
	public List<T> find(String hql,Object obj) throws DataAccessException;
	public List<T> findByPage(final String hql, final List values, final int offset, final int pageSize) throws DataAccessException;
	public List<T> findByProperty(String fieldName,Object value) throws DataAccessException;
	public void executeQuery(final String hql) throws DataAccessException;
	public Object uniqueResult(final String hql) throws DataAccessException;
	public List<T> findByProperties(String[] fields,Object[] values) throws DataAccessException;
	public List<T> listAll() throws DataAccessException;
	public List<T> findSQL(final String sql) throws DataAccessException;
	public Long getCount() throws DataAccessException;
	public Long getCount(String hql) throws DataAccessException;
	public List<T> fillPagetoMap(Map map, final String hql, final List values,
			final int page, final int pageSize);
	public void writeLog(Operator operator, String operation,
			String objectType, T example);
	
	public List<T> findByCriteria(Map<String,String> propertyValue);
}
