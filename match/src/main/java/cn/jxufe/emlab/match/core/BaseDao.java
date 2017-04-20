package cn.jxufe.emlab.match.core;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.jxufe.emlab.match.pojo.BasePojo;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.Syslog;

public abstract class BaseDao<T extends BasePojo> extends HibernateDaoSupport
		implements IBaseDao<T> {
	private Class<T> clazz;
	private String className;

	@SuppressWarnings("unchecked")
	public BaseDao() {
		this.clazz = null;
		Class c = getClass();
		Type t = c.getGenericSuperclass();
		if (t instanceof ParameterizedType) {
			Type[] p = ((ParameterizedType) t).getActualTypeArguments();
			this.clazz = (Class<T>) p[0];
		}
		className = clazz.getSimpleName();
	}

	public List<T> findByName(String name) throws DataAccessException {
		return getHibernateTemplate().find(
				"from " + className + " where name like %" + name + "%");
	}

	public Serializable save(T entity) throws DataAccessException {
		if (entity.getId() == null)
			entity.setId(Utils.getNewUUID());
		if (entity.getCreatetime() == null)
			entity.setCreatetime(Utils.getNow());
		return getHibernateTemplate().save(entity);
	}

	public void save(Collection<T> entities) {
		for (T entity : entities) {
			save(entity);
		}
	}

	public void saveOrUpdate(T entity) throws DataAccessException {
		if (entity.getId() == null)
			save(entity);
		else {
			entity.setCreatetime(Utils.getNow());
			getHibernateTemplate().saveOrUpdate(entity);
		}

	}

	public void saveOrUpdate(Collection<T> entities) throws DataAccessException {
		getHibernateTemplate().saveOrUpdateAll(entities);

	}

	public void delete(T entity) throws DataAccessException {
		getHibernateTemplate().delete(entity);

	}

	public void delete(Serializable id) throws DataAccessException {
		T entity = this.load(id);
		delete(entity);

	}

	@SuppressWarnings("rawtypes")
	public void delete(Collection entities) throws DataAccessException {
		getHibernateTemplate().deleteAll(entities);

	}

	public T load(Serializable id) throws DataAccessException {

		return getHibernateTemplate().load(clazz, id);
	}

	public List publicFind(String queryString) throws DataAccessException {
		return getHibernateTemplate().find(queryString);
	}
	
	public List publicFindSQL(final String sql) throws DataAccessException {
		List<T> list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public List doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				return query.list();
			}
		});
		return list;
	}
	

	public List<T> find(String queryString) throws DataAccessException {
		return getHibernateTemplate().find(queryString);
	}

	public List<T> findSQL(final String sql) throws DataAccessException {
		List<T> list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public List doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql).addEntity(clazz);
				return query.list();
			}

		});
		return list;
	}

	public List<T> find(final String hql, final List values)
			throws DataAccessException {
		
		List list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public List doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				setParameter(query, values);
				return query.list();
			}

		});
		return list;
	}

	public List<T> findSQL(final String sql, final List values)
			throws DataAccessException {
	  	List list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public List doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql).addEntity(clazz);
				setParameter(query, values);
				return query.list();
			}

		});
		return list;
	}
	
	public List<T> find(T example) throws DataAccessException {
		return getHibernateTemplate().findByExample(example);
	}

	public T findById(Serializable id) throws DataAccessException {
		if(id!=null)
		{
		return getHibernateTemplate().get(clazz, id);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<T> find(String hql, Object obj) throws DataAccessException {
		return getHibernateTemplate().find(hql, obj);
	}

	public List<T> findByPage(final String hql, final List values,
			final int offset, final int pageSize) throws DataAccessException {
		if (pageSize == -1)
			return this.find(hql, values);
		List list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				setParameter(query, values);
				List result = query.setFirstResult(offset)
						.setMaxResults(pageSize).list();
				return result;
			}
		});
		return list;
	}

	public List<T> findByPageSQL(final String sql,  final List values,
			final int offset, final int pageSize) throws DataAccessException {
		if (pageSize == -1)
			return this.findSQL(sql, values);
		List list = getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql).addEntity(clazz);
			    setParameter(query, values);
				List result = query.setFirstResult(offset)
						.setMaxResults(pageSize).list();
				return result;
			}
		});
		return list;
	}

	public List<T> findByProperty(String fieldName, Object value)
			throws DataAccessException {
		String sql = "from " + className + " where " + fieldName + "=?";
		return getHibernateTemplate().find(sql, value);
	}

	public void executeQuery(final String sql) throws DataAccessException {
		getSession().doWork(new Work() {
			public void execute(Connection conn) throws SQLException {
				conn.createStatement().execute(sql);
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object uniqueResult(final String hql) throws DataAccessException {
		Object obj = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				Object result = query.uniqueResult();
				return result;
			}
		});
		return obj;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object uniqueResultSQL(final String sql) throws DataAccessException {
		Object obj = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				Object result = query.uniqueResult();
				return result;
			}
		});
		return obj;
	}

	public Long getCount() throws DataAccessException {
		Object obj = uniqueResult("select count(*) from " + className);
		if (obj == null) {
			return 0l;
		} else {
			return (Long) obj;
		}
	}

	public Long getCount(String hql) throws DataAccessException {
		return (Long) uniqueResult(hql);
	}

	public Long getCountSQL(String sql) throws DataAccessException {
		return (Long) uniqueResultSQL(sql);
	}

	public List<T> findByProperties(String[] fields, Object[] values)
			throws DataAccessException {
		String hql = "from " + className + " where ";
		for (int i = 0; i < fields.length; i++) {
			hql += fields[i] + "=? and ";
		}
		hql += "1=1";
		return getHibernateTemplate().find(hql, values);
	}

	public List<T> listAll() throws DataAccessException {
		return getHibernateTemplate().loadAll(clazz);
	}

	protected Serializable saveLog(Syslog log) throws DataAccessException {
		log.setId(Utils.getNewUUID());
		log.setCreatetime(Utils.getNow());
		return getHibernateTemplate().save(log);
	};

	public void writeLog(Operator operator, String operation,
			String objectType, T example) {
		Syslog log = new Syslog();
		log.setUserId(operator.getId());
		if (null == example) {
			log.setName(operation);
			log.setComment("【" + operator.getAccount() + "】" + operation
					+ objectType);
			saveLog(log);
			return;
		}
		if (operation.equals("保存")) {
			if (null == example.getId()) {
				operation = "添加";
			} else {
				operation = "修改";
			}
		}
		log.setName(operation);
		log.setComment("【" + operator.getAccount() + "】" + operation
				+ objectType + "【" + example.getName() + "】");
		saveLog(log);

	}

	public List<T> fillPagetoMap(Map map, final String hql,
			final List values, final int page, final int pageSize) {
		Long count = getCount(hql, values);
		List<T> exampleList = findByPage(hql, values, (page - 1) * pageSize,
				pageSize);

		map.put("total", count);
		map.put("rows", exampleList);
		int totalPage = (int) Math.ceil((double) count / pageSize);
		map.put("totalPage", totalPage);

		return exampleList;

	}

	public List<T> fillPagetoMapSQL(Map map, final String sql,
			 final List values, final int page, final int pageSize) {
		int count = getCountSQL(sql, values);
		List<T> exampleList = findByPageSQL(sql, values, (page - 1) * pageSize,
				pageSize);

		map.put("total", count);
		map.put("rows", exampleList);
		int totalPage = (int) Math.ceil((double) count / pageSize);
		map.put("totalPage", totalPage);

		return exampleList;

	}

	public Long getCount(String hql,  final List values)
			throws DataAccessException {
		int index = hql.indexOf("order");
		String countHql = null;
		if (index < 0) {
			countHql = "select count(*) " + hql.substring(hql.indexOf("from"));
		} else {
			countHql = "select count(*) "
					+ hql.substring(hql.indexOf("from"), index);
		}
		Object obj = uniqueResult(countHql, values);
		if (obj == null) {
			return 0l;
		} else {
			return (Long) obj;
		}
	}

	public int getCountSQL(String sql, final List values)
			throws DataAccessException {
		int index = sql.indexOf("order");
		String countSQL = null;
		if (index < 0) {
			countSQL = "select count(*) " + sql.substring(sql.indexOf("from"));
		} else {
			countSQL = "select count(*) "
					+ sql.substring(sql.indexOf("from"), index);
		}
		Object obj = uniqueResultSQL(countSQL, values);
		if (obj == null) {
			return 0;
		} else {
			return (Integer) obj;
		}
	}

	public Object uniqueResult(final String hql, final List values)
			throws DataAccessException {
		Object obj = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				  setParameter(query, values);
				Object result = query.uniqueResult();
				String sql = query.getQueryString();
				return result;
			}
		});
		return obj;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object uniqueResultSQL(final String sql, final List values)
			throws DataAccessException {
		Object obj = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
                 setParameter(query, values);
				Object result = query.uniqueResult();
				return result;
			}
		});
		return obj;
	}

	public List<T> findByCriteria() {
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<T> findByCriteria(Map<String, String> propertyValue) {
		DetachedCriteria criteria = DetachedCriteria.forClass(clazz);
		if (propertyValue != null) {
			Set<String> keySet = propertyValue.keySet();
			for (Iterator<String> iter = keySet.iterator(); iter.hasNext();) {
				String property = iter.next();
				criteria.add(Restrictions.sqlRestriction(property));
			}
		}
		return getHibernateTemplate().findByCriteria(criteria);

	}

	public void setParameter(Query query, List values) {
		if (query != null) {
			if (null != values && values.size() > 0) {
				for (int i = 0; i < values.size(); i++) {
					query.setParameter(i, values.get(i));
				}
			}
		}
	}
}
