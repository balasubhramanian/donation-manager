import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.bala.donation.common.utils.AppFormatter;
import com.bala.donation.config.model.ConfigModel;

public class StreamTest {

    @Test
    public void emptyListMapTest() {
        System.out.println(AppFormatter.formatINR(100000000));
        List<ConfigModel> data = new ArrayList<ConfigModel>();
        assertNull(data.stream().map(c -> c.getName()).findFirst().orElse(null));

        data.add(new ConfigModel() {
            {
                setName("test");

            }
        });

        assertEquals("test", data.stream().map(c -> c.getName()).findFirst().orElse(null));

    }

}
