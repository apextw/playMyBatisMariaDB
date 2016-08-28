package modules;

import com.google.inject.name.Names;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import play.db.Database;
import services.UserService;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import javax.sql.DataSource;

public class MyBatisModule extends org.mybatis.guice.MyBatisModule {

    @Override
    protected void initialize() {
        environmentId("development");
        bindConstant().annotatedWith(
                Names.named("mybatis.configuration.failFast")).
                to(true);
        bindDataSourceProviderType(PlayDataSourceProvider.class);
        bindTransactionFactoryType(JdbcTransactionFactory.class);
        // 把我們要呼叫DB的類別，增加到MapperClass
        addMapperClass(UserService.class);
    }

    // 產出一個單例模式的連線
    @Singleton
    public static class PlayDataSourceProvider implements Provider<DataSource> {
        final Database db;

        @Inject
        public PlayDataSourceProvider(final Database db) {
        	play.Logger.info("db name = " + db.getName());
        	play.Logger.info("db url  = " + db.getUrl());
            this.db = db;
        }


        @Override
        public DataSource get() {
            return db.getDataSource();
        }
    }

}
